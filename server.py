from fastmcp import FastMCP
from pathlib import Path

import os
import re

def snake_case(s):
    s = s.replace('-', ' ')
    s = re.sub(r'[\s]+', '_', s)
    return s.lower()

def process_file(file_path, folder, mcp):
    filename = file_path.name
    filename_no_ext = Path(filename).stem
    filename_token = snake_case(filename_no_ext)

    tool_name = f"{filename_no_ext.replace('-', '_')}"
    
    # Read first line for description
    with open(file_path, encoding="utf-8") as f:
        first_line = f.readline().strip()
    
    description = first_line.lstrip('#').strip() if first_line.startswith('#') else first_line
    tags = {"dynamic", "folder", filename_token}
    
    # Define the tool function
    def make_tool(path):
        def tool():
            with open(path, encoding="utf-8") as f:
                return f.read()
        return tool
    
    tool_func = make_tool(str(file_path))
    tool_func.__name__ = f"{folder}_{filename_token}"
    
    mcp.add_tool(
        tool_func,
        name=tool_name,
        description=description,
        tags=tags,
        annotations=None,
    )

def register_md_tools(mcp):
    cwd = Path.cwd()
    
    # Only process directories in the root folder (current working directory)
    dirs = [d for d in os.listdir(cwd) if os.path.isdir(os.path.join(cwd, d)) and not d.startswith('.') and not d.startswith('__')]
    for dir in dirs:
        # Process files inside the directory
        files = [f for f in os.listdir(dir) if os.path.isfile(os.path.join(dir, f)) and not f.startswith('.') and f.endswith('.md') and not f.lower().endswith('license.md') and not f.lower().endswith('readme.md')]
        for file in files:
            file_path = cwd / dir / file
            
            process_file(file_path, dir, mcp)

mcp = FastMCP("The Pudim Blueprint Prompts 🍮")
register_md_tools(mcp)

if __name__ == "__main__":
    mcp.run() 