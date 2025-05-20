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
npx mcp-install http://localhost:9000/sse
```

This will connect your local Cursor instance to the running MCP server. 