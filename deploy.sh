#!/bin/bash

# Replace with your server's SSH address
REMOTE_SERVER="pwg-frontend-and-dash"
# Replace with the remote directory path
REMOTE_DIRECTORY="/var/www/html"

# Build the project
nvm use
npm run build

# SSH into the remote server and execute commands
ssh "$REMOTE_SERVER" << EOF
rm -rf "$REMOTE_DIRECTORY"/*
EOF

# Copy the build artifacts to the remote server
scp -r dist/* "$REMOTE_SERVER:$REMOTE_DIRECTORY"
