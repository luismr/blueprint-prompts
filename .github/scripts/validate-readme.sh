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
# This matches the logic in mcp-server/server.py
# Note: MCP clients add server name prefix based on mcp.json configuration
# WARNING: This validation assumes server name "blueprint-prompts" (18 chars with colon)
# If you use a different server name in mcp.json, update server_prefix accordingly
check_tool_name_length() {
  local dir_path=$1
  local folder_name=$(basename "$dir_path")
  
  # Account for MCP server name prefix that clients add (from mcp.json configuration)
  local server_prefix="blueprint-prompts:"
  
  for file in "$dir_path"/*.md; do
    # Skip if no .md files found or if it's README.md
    [[ ! -f "$file" ]] && continue
    local fname=$(basename "$file")
    [[ "$fname" == "README.md" ]] && continue
    
    # Extract filename without extension
    local filename_no_ext="${fname%.md}"
    
    # Convert to snake_case (mimicking the Python logic)
    local filename_token=$(snake_case "$filename_no_ext")
    
    # Generate tool name: folder_filename_token (matching Python server.py)
    # Note: folder_name is the category directory name (e.g., "python", "engineering")
    local tool_name="${folder_name}_${filename_token}"
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

# Function to check if prompts/README.md links to directory README.md
check_category_links() {
  local dir=$1
  local dir_name=$(basename "$dir")
  local index_file="prompts/README.md"
  
  if [ ! -f "$index_file" ]; then
    return # Already checked in main loop
  fi
  
  # Look for a link to the category README
  if ! grep -Fq "($dir_name/README.md)" "$index_file"; then
    errors+=("❌ Error: $index_file is missing link to $dir_name/README.md")
  fi
}

# Function to check if each file in a directory is linked in its README.md
check_folder_links() {
  local dir=$1
  local readme="$dir/README.md"
  
  if [ ! -f "$readme" ]; then
    return
  fi

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

# Check prompts directory structure
PROMPTS_DIR="prompts"

if [ -d "$PROMPTS_DIR" ]; then
    echo "🔍 Checking prompts directory structure..."
    
    # Check if prompts/README.md exists
    check_readme "$PROMPTS_DIR"
    
    # Check if root README links to prompts/README.md
    if ! grep -Fq "($PROMPTS_DIR/README.md)" README.md; then
         errors+=("❌ Error: Root README.md is missing link to $PROMPTS_DIR/README.md")
    fi

    # Check subdirectories in prompts/
    for category_dir in "$PROMPTS_DIR"/*/; do
        # Handle case where no subdirectories exist
        [ -e "$category_dir" ] || continue
        
        dir=${category_dir%/}
        dir_name=$(basename "$dir")
        
        # Skip special directories if any (e.g., .git hidden files are already ignored by glob usually)
        if [[ "$dir_name" == "." || "$dir_name" == ".." ]]; then continue; fi

        echo "🔍 Checking category $dir_name..."
        
        check_readme "$dir"
        check_category_links "$dir"
        check_folder_links "$dir"
        check_tool_name_length "$dir"
        
        echo "✅ $dir_name validation passed"
    done
else
    echo "⚠️ prompts directory not found"
    errors+=("❌ Error: prompts directory not found")
fi

# Check mcp-site (optional check for README presence if we care)
if [ -d "mcp-site" ]; then
  echo "🔍 Checking mcp-site..."
  check_readme "mcp-site"
  if ! grep -Fq "(mcp-site/README.md)" README.md; then
     errors+=("❌ Error: Root README.md is missing link to mcp-site/README.md")
  fi
  echo "✅ mcp-site validation passed"
fi

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
