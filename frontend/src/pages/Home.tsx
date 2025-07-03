import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to My Portfolio
          </h1>
          <p className="text-gray-600">
            Full-stack developer showcasing modern web applications
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About This Project
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              This is a full-stack web application built with modern technologies. 
              It demonstrates various aspects of web development including frontend frameworks, 
              backend APIs, database integration, and interactive visualizations.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Projects</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>Project 1:</strong> Interactive D3.js Graph Visualization - Create and manipulate nodes and edges with drag-and-drop functionality</li>
              <li><strong>Project 2:</strong> Todo List Application - Full CRUD operations with Spring Boot backend and PostgreSQL database</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Technologies Used</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>Frontend:</strong> React, TypeScript, Vite, Tailwind CSS, D3.js</li>
              <li><strong>Backend:</strong> Spring Boot, Java, Maven, JPA</li>
              <li><strong>Database:</strong> PostgreSQL</li>
              <li><strong>Deployment:</strong> Docker, Docker Compose</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Responsive design with modern UI/UX</li>
              <li>Real-time data visualization</li>
              <li>RESTful API with full CRUD operations</li>
              <li>Database persistence with PostgreSQL</li>
              <li>Containerized deployment with Docker</li>
              <li>Type-safe development with TypeScript</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Getting Started</h3>
            <p className="text-gray-700">
              Navigate through the projects using the menu above. Each project showcases different 
              aspects of modern web development, from interactive visualizations to full-stack applications 
              with database integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 