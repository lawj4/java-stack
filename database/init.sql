-- Create the database
CREATE DATABASE tododb;

-- Connect to the database
\c tododb;

-- Create the todos table (this will be auto-created by Hibernate, but here's the schema for reference)
CREATE TABLE IF NOT EXISTS todos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at);

-- Insert some sample data (optional)
INSERT INTO todos (title, description, completed) VALUES
    ('Learn Spring Boot', 'Study Spring Boot fundamentals and create a simple REST API', false),
    ('Build React Frontend', 'Create a modern React TypeScript frontend with Tailwind CSS', false),
    ('Setup PostgreSQL', 'Configure PostgreSQL database and test connections', true),
    ('Deploy Application', 'Deploy the full-stack application to production', false); 