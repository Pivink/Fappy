import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import * as Icons from 'lucide-react';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('login');

  const benefits = [
    {
      icon: Icons.Shield,
      title: 'Secure Storage',
      description: 'Your files are encrypted and stored safely in the cloud'
    },
    {
      icon: Icons.Zap,
      title: 'Lightning Fast',
      description: 'Upload and access your files with blazing speed'
    },
    {
      icon: Icons.Users,
      title: 'Easy Sharing',
      description: 'Share files and folders with team members instantly'
    },
    {
      icon: Icons.Cloud,
      title: 'Anywhere Access',
      description: 'Access your files from any device, anywhere in the world'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar showAuth={true} onAuthToggle={setAuthMode} authMode={authMode} />
      
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Auth Form */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-400">
                {authMode === 'login' 
                  ? 'Sign in to access your files' 
                  : 'Join thousands of satisfied users'
                }
              </p>
            </div>
            
            <AuthForm mode={authMode} />
          </div>
          
          {/* Benefits Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose Fappy?
              </h2>
              <p className="text-gray-300 text-lg">
                Experience the future of file storage with our cutting-edge platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700"
                >
                  <benefit.icon className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;