# Full-Stack Todo List Application

A modern todo list application built with TypeScript React frontend, Java Spring Boot backend, and PostgreSQL database.

## 🚀 Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Updates**: Instant feedback for all CRUD operations
- **Filtering**: View all, active, or completed todos
- **Edit Mode**: In-place editing of todo items
- **RESTful API**: Complete backend API with Spring Boot
- **Database**: PostgreSQL with JPA/Hibernate
- **Type Safety**: Full TypeScript support

## 🏗️ Architecture

```
├── frontend/          # React TypeScript application
├── backend/           # Spring Boot Java application
├── database/          # PostgreSQL setup scripts
└── docker-compose.yml # Database container setup
```

## 📋 Prerequisites

- **Java 17+** (for Spring Boot backend)
- **Node.js 16+** (for React frontend)
- **PostgreSQL 15+** (or Docker for containerized setup)
- **Maven** (for Java dependencies)

## 🛠️ Setup Instructions

### 1. Database Setup

#### Option A: Using Docker (Recommended)
```bash
# Start PostgreSQL with Docker Compose
docker-compose up -d

# The database will be available at:
# Host: localhost
# Port: 5432
# Database: tododb
# Username: postgres
# Password: password
```

#### Option B: Local PostgreSQL
```bash
# Install PostgreSQL and create database
psql -U postgres
CREATE DATABASE tododb;
\q

# Run the initialization script
psql -U postgres -d tododb -f database/init.sql
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Build the application
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run

# The API will be available at: http://localhost:8080
# API Documentation: http://localhost:8080/api/todos
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start

# The application will be available at: http://localhost:3000
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
└── src/main/resources/
    └── application.properties         # Configuration
```

### Frontend (React TypeScript)
```
frontend/
├── src/
│   ├── components/
│   │   ├── TodoForm.tsx              # Add/Edit todo form
│   │   ├── TodoItem.tsx              # Individual todo item
│   │   └── TodoList.tsx              # Todo list with filtering
│   ├── services/
│   │   └── todoService.ts            # API service layer
│   ├── types/
│   │   └── Todo.ts                   # TypeScript interfaces
│   ├── App.tsx                       # Main application component
│   └── index.tsx                     # Application entry point
└── public/
    └── index.html                    # HTML template
```

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Clean interface with Tailwind CSS
- **Loading States**: Skeleton loading for better UX
- **Error Handling**: User-friendly error messages
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation

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
```

### Frontend Configuration
Edit `frontend/src/services/todoService.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8080/api/todos';
```

## 🚀 Deployment

### Backend Deployment
```bash
# Build JAR file
mvn clean package

# Run JAR file
java -jar target/todo-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
# Build production version
npm run build

# Serve static files (requires a web server)
npx serve -s build
```

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

## 📝 Development

### Adding New Features
1. **Backend**: Add new endpoints in `TodoController.java`
2. **Frontend**: Create new components in `src/components/`
3. **Database**: Update entity classes and run migrations

### Code Style
- **Backend**: Follow Spring Boot conventions
- **Frontend**: Use TypeScript strict mode
- **Database**: Use snake_case for column names

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in `application.properties`
   - Verify database exists: `psql -U postgres -l`

2. **Frontend Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npx tsc --noEmit`

3. **CORS Issues**
   - Ensure backend CORS configuration matches frontend URL
   - Check browser console for CORS errors

4. **Port Conflicts**
   - Backend: Change `server.port` in `application.properties`
   - Frontend: Use `PORT=3001 npm start`

For more help, check the logs or create an issue in the repository.