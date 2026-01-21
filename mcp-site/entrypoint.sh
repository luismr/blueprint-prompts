#!/bin/sh

# MCP Portal Site Entrypoint Script

echo "🍮 Starting MCP Portal Site..."

# Print environment info
echo "Environment: ${NODE_ENV:-production}"
echo "Nginx version: $(nginx -v 2>&1)"

# Check if built files exist
if [ ! -f "/usr/share/nginx/html/index.html" ]; then
    echo "❌ Built files not found! Build may have failed."
    exit 1
fi

echo "✅ Built files found"

# Print some stats about the build
echo "📊 Build statistics:"
echo "   - Files in html directory: $(find /usr/share/nginx/html -type f | wc -l)"
echo "   - Total size: $(du -sh /usr/share/nginx/html | cut -f1)"

# Start nginx
echo "🚀 Starting nginx..."
exec "$@"