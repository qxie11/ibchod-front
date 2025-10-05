#!/bin/bash

# Script to run staging container
# Usage: ./docker-run-stage.sh

set -e

echo "🚀 Starting staging container..."

# Stop and remove existing container if it exists
docker stop iphone-store-stage 2>/dev/null || true
docker rm iphone-store-stage 2>/dev/null || true

# Pull latest stage image
echo "📥 Pulling latest stage image..."
docker pull dsx11/iobchod-store:stage

# Run the container
echo "🏃 Running staging container..."
docker run -d \
  --name iphone-store-stage \
  -p 9004:9002 \
  --restart unless-stopped \
  -e NEXT_PUBLIC_API_URL=https://stage.iobchod.shop/v1/api \
  -e NEXT_PUBLIC_BASE_URL=https://stage.iobchod.shop \
  -e NEXTAUTH_SECRET=secretjwt \
  -e NEXTAUTH_URL=https://stage.iobchod.shop \
  -e NODE_ENV=production \
  dsx11/iobchod-store:stage

echo "✅ Staging container started successfully!"
echo "🌐 Application available at: http://localhost:9004"
echo "📊 Container status:"
docker ps | grep iphone-store-stage
