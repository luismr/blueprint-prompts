#!/bin/sh

set -e

# Clone prompts repo if not already present
if [ ! -d "./repo/.git" ]; then
  echo "Cloning prompts repo..."
  git clone "$PROMPTS_REPO" repo
  cd prompts
  git checkout "$PROMPTS_BRANCH"
  cd ..
else
  echo "Prompts repo already exists. Skipping clone."
fi

exec fastmcp run server.py --transport http --host 0.0.0.0 --port 9000 