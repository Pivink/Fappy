import React, { useState } from 'react';
import * as Icons from 'lucide-react';

const FolderGrid = ({ 
  folders, 
  files, 
  onFolderDoubleClick, 
  onFileDownload,
  onEditItem,
  onDeleteItem,
  searchQuery = ''
}) => {
  const [menuOpen, setMenuOpen] = useState(null);
  
  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isEmpty = filteredFolders.length === 0 && filteredFiles.length === 0;

  const handleMenuClick = (e, itemId, type) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === itemId ? null : itemId);
  };

  const handleEdit = (e, item, type) => {
    e.stopPropagation();
    setMenuOpen(null);
    onEditItem(item, type);
  };

  const handleDelete = (e, item, type) => {
    e.stopPropagation();
    setMenuOpen(null);
    onDeleteItem(item, type);
  };

  if (isEmpty && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Icons.File className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-medium mb-2">No results found</h3>
        <p>Try searching with different keywords</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Icons.Folder className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-medium mb-2">This folder is empty</h3>
        <p>Upload files or create folders to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-6">
      {filteredFolders.map((folder) => (
        <div
          key={folder._id}
          className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          onDoubleClick={() => onFolderDoubleClick(folder._id)}
        >
          <div className="relative">
            <Icons.Folder className="h-12 w-12 text-blue-400 mb-2" />
            <button 
              className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded"
              onClick={(e) => handleMenuClick(e, folder._id, 'folder')}
            >
              <Icons.MoreVertical className="h-4 w-4 text-gray-400" />
            </button>
            
            {menuOpen === folder._id && (
              <div className="absolute right-0 top-6 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                <button
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                  onClick={(e) => handleEdit(e, folder, 'folder')}
                >
                  <Icons.Edit className="h-4 w-4 mr-2" />
                  Rename
                </button>
                <button
                  className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700 w-full text-left"
                  onClick={(e) => handleDelete(e, folder, 'folder')}
                >
                  <Icons.Trash className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
          <span className="text-sm text-white text-center truncate w-full">
            {folder.name}
          </span>
        </div>
      ))}
      
      {filteredFiles.map((file) => (
        <div
          key={file._id}
          className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <div className="relative">
            <Icons.File className="h-12 w-12 text-gray-400 mb-2" />
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 flex space-x-1">
              <button 
                onClick={() => onFileDownload(file)}
                className="p-1 hover:bg-gray-600 rounded"
              >
                <Icons.Download className="h-3 w-3 text-gray-400" />
              </button>
              <button 
                className="p-1 hover:bg-gray-600 rounded"
                onClick={(e) => handleMenuClick(e, file._id, 'file')}
              >
                <Icons.MoreVertical className="h-3 w-3 text-gray-400" />
              </button>
            </div>
            
            {menuOpen === file._id && (
              <div className="absolute right-0 top-6 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                <button
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                  onClick={(e) => handleEdit(e, file, 'file')}
                >
                  <Icons.Edit className="h-4 w-4 mr-2" />
                  Rename
                </button>
                <button
                  className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700 w-full text-left"
                  onClick={(e) => handleDelete(e, file, 'file')}
                >
                  <Icons.Trash className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
          <span className="text-sm text-white text-center truncate w-full">
            {file.name}
          </span>
          <span className="text-xs text-gray-400 mt-1">
            {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      ))}
    </div>
  );
};

export default FolderGrid;