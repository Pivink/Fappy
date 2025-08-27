import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Developer</h3>
            <p className="text-gray-300">
              Built with passion for modern web development
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Contact: developer@fappy.com
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TailwindCSS', 'Vite', 'Node.js', 'MongoDB', 'Cloudinary'].map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 Fappy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;