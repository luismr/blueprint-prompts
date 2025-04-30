#!/bin/bash

errors=()

# Function to check if a directory has a README.md file
check_readme() {
  local dir=$1
  if [ ! -f "$dir/README.md" ]; then
    errors+=("❌ Error: $dir is missing README.md file")
  fi
}

# Function to check if root README.md links to directory README.md in a section heading
check_root_links() {
  local dir=$1
  local dir_name=$(basename "$dir")
  # Look for a section heading like ### [GitHub](github/README.md), case-insensitive
  if ! grep -Eiq "^### \[$dir_name\]\($dir/README.md\)" README.md; then
    errors+=("❌ Error: Root README.md is missing section heading link to $dir/README.md")
  fi
}

# Function to check if each file in a directory is linked in its README.md
check_folder_links() {
  local dir=$1
  local readme="$dir/README.md"
  for file in "$dir"/*; do
    fname=$(basename "$file")
    # Skip README.md and directories
    if [[ "$fname" == "README.md" || -d "$file" ]]; then
      continue
    fi
    # Check for a link to the file (either [name](name) or [name](./name)), case-insensitive
    if ! grep -Eiq "\[.*\]\((\./)?$fname\)" "$readme"; then
      errors+=("❌ Error: $readme is missing link to $fname")
    fi
  done
}

# Get all directories that should have README.md files
# Exclude .git, .github, and other special directories
for dir in */; do
  dir=${dir%/}
  if [[ "$dir" != ".git" && "$dir" != ".github" ]]; then
    echo "🔍 Checking $dir directory..."
    check_readme "$dir"
    check_root_links "$dir"
    check_folder_links "$dir"
    echo "✅ $dir validation passed"
  fi

done

if [ ${#errors[@]} -ne 0 ]; then
  echo "❌ Validation failed with the following errors:"
  for err in "${errors[@]}"; do
    echo "$err"
  done
  exit 1
else
  echo "🍮 All README.md files validated successfully!"
fi 