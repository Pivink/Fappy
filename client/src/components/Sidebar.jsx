import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as Icons from 'lucide-react';
import FolderTree from './FolderTree';

const Sidebar = ({ folders, onFolderClick, currentFolder }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Icons.HardDrive, label: 'My Drive', id: 'root' },
    { icon: Icons.Clock, label: 'Recent', id: 'recent' },
    { icon: Icons.Trash2, label: 'Trash', id: 'trash' },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Icons.User className="h-8 w-8 text-gray-400" />
          <div>
            <p className="text-white font-medium">{user?.name}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onFolderClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                currentFolder === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="px-4 py-2">
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Folders</h3>
            <FolderTree
              folders={folders}
              onFolderClick={onFolderClick}
              currentFolder={currentFolder}
            />
          </div>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Icons.LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;