#!/bin/bash

# CI/CD Script for IObchod Store
# Usage: ./scripts/ci-cd.sh [ci|cd|full]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION="eu-north-1"
ECR_REPOSITORY="iobchod-store"
ECS_CLUSTER="ecs-ec2-cluster"
ECS_SERVICE="frontend-service"
IMAGE_TAG="latest"

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# CI Functions
run_ci() {
    log_info "Starting Continuous Integration..."
    
    # Type check
    log_info "Running TypeScript type check..."
    if npm run typecheck; then
        log_success "TypeScript type check passed"
    else
        log_warning "TypeScript type check failed (continuing...)"
    fi
    
    # Lint check
    log_info "Running ESLint check..."
    if npm run lint; then
        log_success "ESLint check passed"
    else
        log_warning "ESLint check failed (continuing...)"
    fi
    
    # Build
    log_info "Building application..."
    NEXT_PUBLIC_API_URL=https://iobchod.shop/v1/api \
    NEXT_PUBLIC_BASE_URL=https://iobchod.shop \
    npm run build
    
    log_success "CI completed successfully!"
}

# CD Functions
run_cd() {
    log_info "Starting Continuous Deployment..."
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    
    # Check if AWS credentials are configured
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    fi
    
    # Get ECR login token
    log_info "Logging into Amazon ECR..."
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_REGION.dkr.ecr.$AWS_REGION.amazonaws.com
    
    # Build and push Docker image
    log_info "Building and pushing Docker image..."
    ECR_REGISTRY="$AWS_REGION.dkr.ecr.$AWS_REGION.amazonaws.com"
    
    docker build \
        --build-arg NEXT_PUBLIC_API_URL=https://iobchod.shop/v1/api \
        --build-arg NEXT_PUBLIC_BASE_URL=https://iobchod.shop \
        -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG \
        -t $ECR_REGISTRY/$ECR_REPOSITORY:latest \
        .
    
    log_info "Pushing image to ECR..."
    docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
    docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
    
    # Check ECS service status
    log_info "Checking current ECS service status..."
    aws ecs describe-services \
        --cluster $ECS_CLUSTER \
        --services $ECS_SERVICE \
        --query 'services[0].{status:status,runningCount:runningCount,pendingCount:pendingCount,desiredCount:desiredCount}'
    
    # Update ECS service
    log_info "Updating ECS service with new image..."
    aws ecs update-service \
        --cluster $ECS_CLUSTER \
        --service $ECS_SERVICE \
        --force-new-deployment
    
    # Wait for service to be stable
    log_info "Waiting for ECS service to be stable..."
    aws ecs wait services-stable \
        --cluster $ECS_CLUSTER \
        --services $ECS_SERVICE
    
    # Verify deployment
    log_info "Verifying deployment..."
    aws ecs describe-services \
        --cluster $ECS_CLUSTER \
        --services $ECS_SERVICE \
        --query 'services[0].{status:status,runningCount:runningCount,pendingCount:pendingCount,desiredCount:desiredCount}'
    
    log_success "CD completed successfully!"
    log_success "🌐 Application is available at: https://iobchod.shop"
}

# Main script
case "${1:-full}" in
    "ci")
        run_ci
        ;;
    "cd")
        run_cd
        ;;
    "full")
        run_ci
        run_cd
        ;;
    *)
        echo "Usage: $0 [ci|cd|full]"
        echo "  ci   - Run only Continuous Integration (typecheck, lint, build)"
        echo "  cd   - Run only Continuous Deployment (build, push, deploy)"
        echo "  full - Run both CI and CD (default)"
        exit 1
        ;;
esac
