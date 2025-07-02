#!/bin/bash

echo "🚀 Starting Todo Application with Docker..."

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose down

# Build and start all services
echo "🔨 Building and starting services..."
docker compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "📊 Service Status:"
docker compose ps

echo ""
echo "✅ Application is starting up!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8080/api/todos"
echo "🗄️  Database: localhost:5432"
echo ""
echo "📝 To view logs: docker compose logs -f"
echo "🛑 To stop: docker compose down" 