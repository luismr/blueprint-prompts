#!/bin/bash

errors=()

# Function to convert filename to snake_case (mimicking Python logic)
snake_case() {
  local s="$1"
  # Replace hyphens with spaces, then spaces with underscores, then lowercase
  echo "$s" | sed 's/-/ /g' | sed 's/ /_/g' | tr '[:upper:]' '[:lower:]'
}

# Function to check if tool names would exceed 60 characters
# Tool names are generated as: {folder}_{snake_case_filename}
# This matches the logic in mcp-server/server.py line 66
# Note: MCP clients add server name prefix based on mcp.json configuration
# WARNING: This validation assumes server name "blueprint-prompts" (18 chars with colon)
# If you use a different server name in mcp.json, update server_prefix accordingly
check_tool_name_length() {
  local dir=$1
  # Account for MCP server name prefix that clients add (from mcp.json configuration)
  local server_prefix="blueprint-prompts:"
  local prefix_length=${#server_prefix}
  
  for file in "$dir"/*.md; do
    # Skip if no .md files found or if it's README.md
    [[ ! -f "$file" ]] && continue
    local fname=$(basename "$file")
    [[ "$fname" == "README.md" ]] && continue
    
    # Extract filename without extension
    local filename_no_ext="${fname%.md}"
    
    # Convert to snake_case (mimicking the Python logic)
    local filename_token=$(snake_case "$filename_no_ext")
    
    # Generate tool name: folder_filename_token (matching Python server.py line 66)
    local tool_name="${dir}_${filename_token}"
    local full_name="${server_prefix}${tool_name}"
    
    # Check if full tool name (with prefix) exceeds 60 characters
    if [ ${#full_name} -gt 60 ]; then
      errors+=("❌ Error: Tool name '${tool_name}' with prefix '${server_prefix}' results in '${full_name}' (${#full_name} chars) which exceeds 60 character limit for file $fname")
    fi
  done
}

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
  if [[ "$dir" != ".git" && "$dir" != ".github" && "$dir" != "mcp-server" ]]; then
    echo "🔍 Checking $dir directory..."
    check_readme "$dir"
    check_root_links "$dir"
    check_folder_links "$dir"
    check_tool_name_length "$dir"
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
  echo ""
  echo "🍮 All README.md files validated successfully!"
  echo ""
fi 