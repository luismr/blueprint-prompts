#!/bin/bash
#
# Install git hooks for Blueprint Prompts repository
# This script sets up pre-commit and pre-push hooks to run validation automatically
#

set -e

# Get the repository root directory
REPO_ROOT=$(git rev-parse --show-toplevel)
HOOKS_DIR="$REPO_ROOT/.git/hooks"

echo "🔧 Installing git hooks for Blueprint Prompts repository..."
echo "Repository root: $REPO_ROOT"

# Create pre-commit hook
echo "📝 Creating pre-commit hook..."
cat > "$HOOKS_DIR/pre-commit" << 'EOF'
#!/bin/bash
#
# Pre-commit hook for Blueprint Prompts repository
# This hook runs validation to ensure:
# - All directories have README.md files
# - All README.md files link to their respective files
# - Tool names don't exceed 60-character limit with MCP server prefix
#

echo "🔍 Running pre-commit validation..."

# Change to repository root
cd "$(git rev-parse --show-toplevel)"

# Run the validation script
if bash .github/scripts/validate-readme.sh; then
    echo "✅ Pre-commit validation passed!"
    exit 0
else
    echo ""
    echo "❌ Pre-commit validation failed!"
    echo ""
    echo "Please fix the validation errors before committing."
    echo "You can run the validation manually with:"
    echo "  bash .github/scripts/validate-readme.sh"
    echo ""
    echo "To bypass this check (not recommended), use:"
    echo "  git commit --no-verify"
    echo ""
    exit 1
fi
EOF

# Create pre-push hook
echo "📝 Creating pre-push hook..."
cat > "$HOOKS_DIR/pre-push" << 'EOF'
#!/bin/bash
#
# Pre-push hook for Blueprint Prompts repository
# This hook runs validation as a final safety check before pushing to remote
# It ensures all changes maintain repository standards
#

echo "🚀 Running pre-push validation..."

# Change to repository root
cd "$(git rev-parse --show-toplevel)"

# Run the validation script
if bash .github/scripts/validate-readme.sh; then
    echo "✅ Pre-push validation passed!"
    exit 0
else
    echo ""
    echo "❌ Pre-push validation failed!"
    echo ""
    echo "Please fix the validation errors before pushing."
    echo "You can run the validation manually with:"
    echo "  bash .github/scripts/validate-readme.sh"
    echo ""
    echo "To bypass this check (not recommended), use:"
    echo "  git push --no-verify"
    echo ""
    exit 1
fi
EOF

# Make hooks executable
chmod +x "$HOOKS_DIR/pre-commit"
chmod +x "$HOOKS_DIR/pre-push"

echo "✅ Git hooks installed successfully!"
echo ""
echo "The following hooks are now active:"
echo "  - pre-commit: Runs validation before each commit"
echo "  - pre-push: Runs validation before each push"
echo ""
echo "To test the hooks, you can run them manually:"
echo "  .git/hooks/pre-commit"
echo "  .git/hooks/pre-push"
echo ""
echo "To bypass hooks (not recommended), use:"
echo "  git commit --no-verify"
echo "  git push --no-verify"
echo ""