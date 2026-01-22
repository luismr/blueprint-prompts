# The Pudim 🍮 Prompts 🗂️ MCP Server 🚀

This folder contains the MCP server, which can be built and run using Docker.

## Building the Docker Image

To build the Docker image, run:

```sh
docker build -t blueprint-prompts-server .
```

## Running the Server

### Default (main branch)

To run the server using the default `main` branch:

```sh
docker run --rm -p 9000:9000 blueprint-prompts-server
```

### Specific Branch

To run the server using a specific branch (e.g., `feature/mcp-server-to-call-prompts`):

```sh
docker run --rm -p 9000:9000 -e PROMPTS_BRANCH=feature/mcp-server-to-call-prompts blueprint-prompts-server
```

## Running from Docker Hub Image

To run the server using the official Docker Hub image:

```sh
docker run \
   --rm -p 9000:9000 \
   luismachadoreis/the-pudim-blueprint-prompts
```

To run the server using the official Docker Hub image as a daemon:

```sh
docker run \
   -d --restart always -p 9000:9000 \
   luismachadoreis/the-pudim-blueprint-prompts
```

To use a specific branch with the Docker Hub image:

```sh
docker run \
   --rm -p 9000:9000 \
   -e PROMPTS_BRANCH=feature/mcp-server-to-call-prompts \
   luismachadoreis/the-pudim-blueprint-prompts
```

## Installing on Cursor

Once the server is running, you can install it in Cursor using:

```sh
npx mcp-install http://localhost:9000/mcp
```

This will connect your local Cursor instance to the running MCP server.

## Important: Tool Name Length Limits

### MCP Server Name Impact

When configuring this MCP server in your `mcp.json` configuration file, be aware that the server name you choose will be used as a prefix for all tool names. This affects the total character count for tool names, which have a 60-character limit in most MCP clients.

**Tool Name Format:** `{server-name}:{folder}_{snake_case_filename}`

### Example

If you configure the server in your `mcp.json` as:

```json
{
  "mcpServers": {
    "blueprint-prompts": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch", "http://localhost:9000/mcp"]
    }
  }
}
```

The server name `blueprint-prompts` (18 characters including the colon) will be prefixed to all tool names:

- File: `typescript/vite-with-vitest-react-4d195db.md`
- Tool name: `blueprint-prompts:typescript_vite_with_vitest_react_4d195db` (59 characters)

### Recommendations

1. **Use short server names** in your `mcp.json` to avoid exceeding the 60-character limit
2. **Good examples:** `bp`, `prompts`, `blueprints`
3. **Avoid long names like:** `blueprint-prompts-server`, `my-awesome-blueprint-collection`

### Validation

This repository includes validation to ensure all tool names stay within the 60-character limit when using the default server name `blueprint-prompts`. If you use a different server name, adjust the validation accordingly or ensure your chosen name doesn't cause tool names to exceed 60 characters. 