#!/bin/bash

echo "🚀 Setting up Full-Stack Todo Application"
echo "=========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Start PostgreSQL with Docker
echo "🐘 Starting PostgreSQL database..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Build and start backend
echo "☕ Building and starting Spring Boot backend..."
cd backend
mvn clean install -q
echo "🚀 Starting backend server..."
mvn spring-boot:run -q &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 15

# Install frontend dependencies and start
echo "⚛️  Installing frontend dependencies..."
cd frontend
npm install -q
echo "🚀 Starting React development server..."
npm start -q &
FRONTEND_PID=$!
cd ..

echo ""
echo "🎉 Setup complete!"
echo "=================="
echo "📊 Database: PostgreSQL running on localhost:5432"
echo "🔧 Backend: Spring Boot API running on http://localhost:8080"
echo "🎨 Frontend: React app running on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    docker-compose down
    echo "✅ All services stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep script running
wait 