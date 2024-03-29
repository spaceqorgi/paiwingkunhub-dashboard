#!/bin/bash

# Replace with your server's SSH address
REMOTE_SERVER="pwg-frontend-and-dash"
# Replace with the remote directory path
REMOTE_DIRECTORY="/var/www/html"

# Build the project
npm run build

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Aborting deployment."
  exit 1
fi

# SSH into the remote server and execute commands
ssh "$REMOTE_SERVER" << EOF
  rm -rf "$REMOTE_DIRECTORY"/*
EOF

# Copy the build artifacts to the remote server
scp -r dist/* "$REMOTE_SERVER:$REMOTE_DIRECTORY"
