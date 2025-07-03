import React from 'react';

const Project1 = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Project 1
          </h1>
          <p className="text-gray-600">
            First project showcase
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Project Overview
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              This is Project 1. Here you can showcase your first project with detailed information.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Feature 1 description</li>
              <li>Feature 2 description</li>
              <li>Feature 3 description</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Technologies Used</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Technology 1</li>
              <li>Technology 2</li>
              <li>Technology 3</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Project Details</h3>
            <p className="text-gray-700">
              Add more detailed information about your project here. You can include links, 
              screenshots, or any other relevant content to showcase your work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project1; 