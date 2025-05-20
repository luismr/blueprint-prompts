#!/bin/sh

set -e

# Clone prompts repo if not already present
if [ ! -d "./prompts/.git" ]; then
  echo "Cloning prompts repo..."
  git clone "$PROMPTS_REPO" prompts
  cd prompts
  git checkout "$PROMPTS_BRANCH"
  cd ..
else
  echo "Prompts repo already exists. Skipping clone."
fi

exec fastmcp run server.py --transport sse --host 0.0.0.0 --port 9000 