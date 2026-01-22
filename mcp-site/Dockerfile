# Multi-stage build for MCP Portal Site
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files from mcp-site
COPY mcp-site/package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy mcp-site source code
COPY mcp-site/ ./

# Copy prompt directories from parent
COPY prompts ./prompts
COPY MCP-CONFIGURATION.md ./prompts/
COPY README.md ./prompts/

# Generate prompts data
RUN node scripts/generate-prompts-data.js

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine-slim

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY mcp-site/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy entrypoint script
COPY mcp-site/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
