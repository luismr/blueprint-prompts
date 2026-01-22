from fastmcp import FastMCP
from fastmcp.server.lifespan import lifespan
from fastmcp.tools import Tool
from fastmcp.utilities.logging import get_logger
from pathlib import Path
import os
import re

# Set up logging
logger = get_logger(__name__)

def snake_case(s):
    s = s.replace('-', ' ')
    s = re.sub(r'[\s]+', '_', s)
    return s.lower()

def process_file(file_path, folder, mcp):
    filename = file_path.name
    filename_no_ext = Path(filename).stem
    filename_token = snake_case(filename_no_ext)

    tool_name = f"{filename_no_ext.replace('-', '_')}"
    
    logger.info(f"Processing file: {filename}")
    logger.info(f"  - Folder: {folder}")
    logger.info(f"  - Filename token: {filename_token}")
    logger.info(f"  - Tool name: {tool_name}")
    
    # Read description from ## Description section
    description = ""
    try:
        with open(file_path, encoding="utf-8") as f:
            content = f.read()
            description_match = re.search(r'## Description\n\n(.*?)(?=\n##|\Z)', content, re.DOTALL)
            if description_match:
                description = description_match.group(1).strip()
            else:
                # Fallback to first line if no Description section found
                first_line = content.split('\n')[0].strip()
                description = first_line.lstrip('#').strip() if first_line.startswith('#') else first_line
        
        logger.info(f"  - Description: {description[:100]}{'...' if len(description) > 100 else ''}")
    except Exception as e:
        logger.error(f"  - Error reading file: {e}")
        return
    
    tags = {"dynamic", folder, filename_token}
    logger.info(f"  - Tags: {tags}")
    
    # Create a tool function
    def dynamic_tool():
        try:
            with open(str(file_path), encoding="utf-8") as f:
                return f.read()
        except Exception as e:
            logger.error(f"Error reading file in tool execution: {e}")
            return f"Error reading file: {e}"
    
    try:
        # Create a Tool object using FastMCP 3.x API
        tool_obj = Tool.from_function(
            fn=dynamic_tool,
            name=f"{folder}_{filename_token}",
            description=description,
        )
        # Set tags explicitly
        if hasattr(tool_obj, "tags"):
             tool_obj.tags = tags
        
        # Register the tool with FastMCP
        mcp.add_tool(tool_obj)
        logger.info(f"  - ✅ Successfully added tool: {tool_obj.name}")
        logger.info(f"  - Tool description: {description[:100]}{'...' if len(description) > 100 else ''}")
        logger.info(f"  - Tool tags: {tags}")
    except Exception as e:
        logger.error(f"  - ❌ Failed to add tool: {e}")
        logger.error(f"  - Tool details: {folder}_{filename_token}, {description[:100]}")

def register_md_tools(mcp):
    # Try multiple directory locations in order of preference
    candidate_dirs = [
        Path("/app/repo/prompts"),
        Path("../prompts").resolve(),
        Path.cwd()
    ]
    
    prompts_dir = None
    for candidate in candidate_dirs:
        logger.info(f"Looking for prompts in: {candidate}")
        if candidate.exists():
            prompts_dir = candidate
            logger.info(f"Found prompts directory: {prompts_dir}")
            break
        else:
            logger.warning(f"Directory does not exist: {candidate}")
    
    if prompts_dir is None:
        logger.error("No valid prompts directory found")
        return
    
    # Only process directories in the prompts folder
    dirs = [d for d in os.listdir(prompts_dir) if os.path.isdir(os.path.join(prompts_dir, d)) and not d.startswith('.') and not d.startswith('__') and d != 'mcp-server']
    
    logger.info(f"Found directories: {dirs}")
    
    total_tools_added = 0
    
    for dir in dirs:
        logger.info(f"Processing directory: {dir}")
        dir_path = prompts_dir / dir
        logger.info(f"Directory path: {dir_path}")
        
        # Process markdown files inside the directory
        files = [f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f)) and not f.startswith('.') and f.endswith('.md') and not f.lower().endswith('license.md') and not f.lower().endswith('readme.md')]
        
        logger.info(f"Found {len(files)} markdown files in {dir}: {files}")
        
        for file in files:
            file_path = dir_path / file
            logger.info(f"Processing file: {file_path}")
            
            process_file(file_path, dir, mcp)
            total_tools_added += 1
    
    logger.info(f"Total tools processed: {total_tools_added}")
    
    # Log all registered tools
    try:
        # Note: get_tools() might be async in newer FastMCP versions
        # Let's try to get the tools count differently
        logger.info("Tool registration completed successfully")
    except Exception as e:
        logger.error(f"Could not retrieve registered tools: {e}")

# Create MCP server instance
logger.info("Creating FastMCP server instance...")

@lifespan
async def register_tools(server):
    logger.info("Starting tool registration via lifespan...")
    register_md_tools(server)
    logger.info("Tool registration completed.")
    yield

mcp = FastMCP("🍮", lifespan=register_tools)

if __name__ == "__main__":
    logger.info("Starting MCP server...")
    mcp.run() 