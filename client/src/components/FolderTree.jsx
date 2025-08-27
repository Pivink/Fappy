import React, { useState } from 'react';
import * as Icons from 'lucide-react';

const FolderTree = ({ folders, onFolderClick, currentFolder, level = 0 }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFolderClick = (folder) => {
    onFolderClick(folder._id);
    if (folder.subFolders && folder.subFolders.length > 0) {
      toggleFolder(folder._id);
    }
  };

  return (
    <div className={`${level > 0 ? 'ml-4' : ''}`}>
      {folders.map((folder) => {
        const isExpanded = expandedFolders.has(folder._id);
        const isActive = currentFolder === folder._id;
        const hasSubfolders = folder.subFolders && folder.subFolders.length > 0;

        return (
          <div key={folder._id} className="space-y-1">
            <div
              className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleFolderClick(folder)}
            >
              {hasSubfolders && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(folder._id);
                  }}
                  className="p-0.5"
                >
                  {isExpanded ? (
                    <Icons.ChevronDown className="h-3 w-3" />
                  ) : (
                    <Icons.ChevronRight className="h-3 w-3" />
                  )}
                </button>
              )}
              {!hasSubfolders && <div className="w-4" />}
              
              {isExpanded ? (
                <Icons.FolderOpen className="h-4 w-4" />
              ) : (
                <Icons.Folder className="h-4 w-4" />
              )}
              
              <span className="text-sm truncate">{folder.name}</span>
            </div>
            
            {isExpanded && hasSubfolders && (
              <FolderTree
                folders={folder.subFolders}
                onFolderClick={onFolderClick}
                currentFolder={currentFolder}
                level={level + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FolderTree;