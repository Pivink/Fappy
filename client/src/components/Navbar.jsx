import React from 'react';
import * as Icons from 'lucide-react';

const Navbar = ({ showAuth = false, onAuthToggle, authMode }) => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icons.HardDrive className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Fappy</h1>
        </div>
        
        {showAuth && (
          <div className="flex space-x-2">
            <button
              onClick={() => onAuthToggle('login')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                authMode === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => onAuthToggle('signup')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                authMode === 'signup'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;