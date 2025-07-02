const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to our Todo List Application! This is a modern, full-stack web application 
              built with cutting-edge technologies to help you manage your tasks efficiently.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe that productivity starts with organization. Our goal is to provide 
              a simple, intuitive, and powerful tool that helps you stay on top of your tasks 
              and achieve your goals.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Frontend</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• React 18 with TypeScript</li>
                  <li>• Vite for fast development</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• React Router for navigation</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Backend</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Spring Boot 3.2</li>
                  <li>• Java 23</li>
                  <li>• Spring Data JPA</li>
                  <li>• PostgreSQL Database</li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• Create, read, update, and delete todos</li>
              <li>• Mark todos as complete or incomplete</li>
              <li>• Real-time updates</li>
              <li>• Responsive design for all devices</li>
              <li>• Fast and reliable performance</li>
            </ul>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Note:</strong> This is a demo application showcasing modern web development 
                practices. Feel free to explore and test all the features!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 