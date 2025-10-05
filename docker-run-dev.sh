#!/bin/bash

# Script to run development container
# Usage: ./docker-run-dev.sh

set -e

echo "🚀 Starting development container..."

# Stop and remove existing container if it exists
docker stop iphone-store-dev 2>/dev/null || true
docker rm iphone-store-dev 2>/dev/null || true

# Pull latest dev image
echo "📥 Pulling latest dev image..."
docker pull dsx11/iobchod-store:dev

# Run the container
echo "🏃 Running development container..."
docker run -d \
  --name iphone-store-dev \
  -p 9003:9002 \
  --restart unless-stopped \
  -e NEXT_PUBLIC_API_URL=https://dev.iobchod.shop/v1/api \
  -e NEXT_PUBLIC_BASE_URL=https://dev.iobchod.shop \
  -e NEXTAUTH_SECRET=secretjwt \
  -e NEXTAUTH_URL=https://dev.iobchod.shop \
  -e NODE_ENV=development \
  dsx11/iobchod-store:dev

echo "✅ Development container started successfully!"
echo "🌐 Application available at: http://localhost:9003"
echo "📊 Container status:"
docker ps | grep iphone-store-dev
