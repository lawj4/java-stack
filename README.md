# Full-Stack Todo List Application

A modern todo list application built with TypeScript React frontend (Vite), Java Spring Boot backend, and PostgreSQL database.

## 🚀 Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Updates**: Instant feedback for all CRUD operations
- **Filtering**: View all, active, or completed todos
- **Edit Mode**: In-place editing of todo items
- **Navigation**: Multi-page application with React Router
- **RESTful API**: Complete backend API with Spring Boot
- **Database**: PostgreSQL with JPA/Hibernate
- **Type Safety**: Full TypeScript support
- **Fast Development**: Vite-powered frontend with hot reload
- **Docker Support**: Containerized deployment

## 🏗️ Architecture

```
├── frontend/          # React TypeScript + Vite application
├── backend/           # Spring Boot Java application
├── database/          # PostgreSQL setup scripts
├── docker-compose.yml # Complete application setup
└── start-docker.sh    # Docker startup script
```

## 📋 Prerequisites

- **Java 17+** (for Spring Boot backend)
- **Node.js 16+** (for React frontend)
- **PostgreSQL 15+** (or Docker for containerized setup)
- **Maven** (for Java dependencies)
- **Docker & Docker Compose** (for containerized deployment)

## 🛠️ Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd java-stack

# Start all services with Docker
./start-docker.sh

# Or manually:
docker-compose up -d

# Access the application:
# Frontend: http://localhost:3001
# Backend API: http://localhost:8080
# Database: localhost:5432
```

### Option 2: Local Development

#### 1. Database Setup

**Using Docker (Easiest):**
```bash
# Start only the database
docker-compose up -d postgres

# The database will be available at:
# Host: localhost
# Port: 5432
# Database: tododb
# Username: postgres
# Password: password
```

**Using Local PostgreSQL:**
```bash
# Install PostgreSQL via Homebrew (macOS)
brew install postgresql
brew services start postgresql

# Create database and user
psql postgres
CREATE USER postgres WITH PASSWORD 'password';
ALTER USER postgres WITH SUPERUSER;
CREATE DATABASE tododb OWNER postgres;
\q

# Run the initialization script
psql -U postgres -d tododb -f database/init.sql
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Build the application
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run

# The API will be available at: http://localhost:8080
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server (Vite)
npm run dev

# The application will be available at: http://localhost:5173
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/{id}` | Get todo by ID |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/{id}` | Update todo |
| PATCH | `/api/todos/{id}/toggle` | Toggle todo completion |
| DELETE | `/api/todos/{id}` | Delete todo |
| GET | `/api/todos/status/{completed}` | Get todos by status |

## 📁 Project Structure

### Backend (Spring Boot)
```
backend/
├── src/main/java/com/example/todobackend/
│   ├── TodoBackendApplication.java    # Main application class
│   ├── controller/
│   │   └── TodoController.java        # REST API endpoints
│   ├── service/
│   │   └── TodoService.java           # Business logic
│   ├── repository/
│   │   └── TodoRepository.java        # Data access layer
│   └── model/
│       └── Todo.java                  # Entity class
├── src/main/resources/
│   └── application.properties         # Configuration
├── Dockerfile                         # Backend container
└── pom.xml                           # Maven dependencies
```

### Frontend (React TypeScript + Vite)
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx             # Top navigation bar
│   │   ├── TodoForm.tsx              # Add/Edit todo form
│   │   ├── TodoItem.tsx              # Individual todo item
│   │   └── TodoList.tsx              # Todo list with filtering
│   ├── pages/
│   │   ├── Home.tsx                  # Main todo page
│   │   ├── About.tsx                 # About page
│   │   └── Contact.tsx               # Contact page
│   ├── services/
│   │   └── todoService.ts            # API service layer
│   ├── types/
│   │   └── Todo.ts                   # TypeScript interfaces
│   ├── App.tsx                       # Main application component
│   └── index.tsx                     # Application entry point
├── public/                           # Static assets
├── index.html                        # HTML template (Vite)
├── vite.config.ts                    # Vite configuration
├── tailwind.config.js                # Tailwind CSS config
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
└── Dockerfile                        # Frontend container
```

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Clean interface with Tailwind CSS
- **Loading States**: Skeleton loading for better UX
- **Error Handling**: User-friendly error messages
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Multi-page Navigation**: Home, About, and Contact pages
- **Real-time Updates**: Instant feedback for all operations

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:
```properties
# Database settings
spring.datasource.url=jdbc:postgresql://localhost:5432/tododb
spring.datasource.username=postgres
spring.datasource.password=password

# Server settings
server.port=8080

# CORS configuration
spring.web.cors.allowed-origins=http://localhost:3001,http://localhost:5173
```

### Frontend Configuration
The frontend uses Vite's proxy configuration in `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

## 🐳 Docker Deployment

### Complete Application Stack
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d
```

### Individual Services
```bash
# Start only database
docker-compose up -d postgres

# Start only backend
docker-compose up -d backend

# Start only frontend
docker-compose up -d frontend
```

### Docker Services
- **Frontend**: React app on port 3001
- **Backend**: Spring Boot API on port 8080
- **Database**: PostgreSQL on port 5432

## 🚀 Production Deployment

### Backend Deployment
```bash
# Build JAR file
cd backend
mvn clean package

# Run JAR file
java -jar target/todo-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
# Build production version
cd frontend
npm run build

# Serve static files
npx serve -s dist
```

### Hosting Recommendations
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Railway, Render, or Heroku
- **Database**: Supabase, Neon, or Railway PostgreSQL

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

#### 2. Database Connection Issues
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Start PostgreSQL
brew services start postgresql

# Or using Docker
docker-compose up -d postgres
```

#### 3. Frontend Build Issues
```bash
# Clean and reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 4. Docker Issues
```bash
# Check Docker status
docker --version
docker-compose --version

# Restart Docker Desktop (macOS)
# Or restart Docker service (Linux)
sudo systemctl restart docker
```

#### 5. Maven Issues
```bash
# Clean Maven cache
cd backend
mvn clean

# Update dependencies
mvn dependency:resolve
```

### Development Commands

```bash
# Start development environment
./start-docker.sh

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild specific service
docker-compose up --build -d [service-name]
```

## 📝 Development Notes

### Vite Migration
This project uses Vite instead of Create React App for:
- Faster development server startup
- Hot module replacement
- Better build performance
- Modern tooling

### API Proxy
The frontend uses Vite's proxy feature to forward API calls to the backend, eliminating CORS issues during development.

### Database Persistence
Docker volumes ensure database data persists between container restarts.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.