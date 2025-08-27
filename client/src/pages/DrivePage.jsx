import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import FolderGrid from '../components/FolderGrid';
import UploadModal from '../components/UploadModal';
import EditModal from '../components/EditModal'; // You'll need to create this
import ConfirmModal from '../components/ConfirmModal'; // You'll need to create this
import {
  getUserFolders,
  getFolderById,
  createFolder,
  deleteFolder,
  updateFolder
} from '../services/folder';
import {
  uploadFile,
  getFiles,
  deleteFile,
  updateFile
} from '../services/file';

const DrivePage = () => {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('root');
  const [currentFolderData, setCurrentFolderData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState(''); // 'folder' or 'file'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const [foldersResponse, filesResponse] = await Promise.all([
        getUserFolders(user.id),
        getFiles(user.id)
      ]);
      setFolders(foldersResponse || []);
      setFiles(filesResponse || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFolderClick = async (folderId) => {
    if (folderId === 'root') {
      setCurrentFolder('root');
      setCurrentFolderData(null);
      return;
    }

    if (folderId === 'recent' || folderId === 'trash') {
      setCurrentFolder(folderId);
      setCurrentFolderData(null);
      return;
    }

    try {
      const response = await getFolderById(folderId);
      setCurrentFolder(folderId);
      setCurrentFolderData(response);
    } catch (error) {
      console.error('Error loading folder:', error);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      if (currentFolder !== "root") {
        formData.append("parent", currentFolder);
      }

      await uploadFile(formData);
      await loadUserData();
      
      if (currentFolder !== "root") {
        const response = await getFolderById(currentFolder);
        setCurrentFolderData(response);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCreateFolder = async (name) => {
    try {
      const parent = currentFolder === 'root' ? null : currentFolder;
      await createFolder(user._id, { name, parent });
      await loadUserData();
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const handleFileDownload = (file) => {
    window.open(file.url, '_blank');
  };

  const handleEditItem = (item, type) => {
    setSelectedItem(item);
    setItemType(type);
    setIsEditModalOpen(true);
  };

  const handleUpdateItem = async (newName) => {
    try {
      if (itemType === 'folder') {
        await updateFolder(selectedItem._id, { name: newName });
      } else {
        await updateFile(selectedItem._id, { name: newName });
      }
      
      await loadUserData();
      
      // Refresh current folder if we're inside one
      if (currentFolder !== 'root') {
        const response = await getFolderById(currentFolder);
        setCurrentFolderData(response);
      }
      
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = (item, type) => {
    setSelectedItem(item);
    setItemType(type);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (itemType === 'folder') {
        await deleteFolder(selectedItem._id);
      } else {
        await deleteFile(selectedItem._id);
      }
      
      await loadUserData();
      
      // If we deleted the current folder, go back to root
      if (itemType === 'folder' && currentFolder === selectedItem._id) {
        setCurrentFolder('root');
        setCurrentFolderData(null);
      }
      
      // Refresh current folder if we're inside one
      if (currentFolder !== 'root') {
        const response = await getFolderById(currentFolder);
        setCurrentFolderData(response);
      }
      
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const getCurrentFolderItems = () => {
    if (currentFolder === 'root') {
      return {
        folders: folders.filter(folder => !folder.parent),
        files: files.filter(file => !file.parent)
      };
    }

    if (currentFolder === 'recent' || currentFolder === 'trash') {
      return { folders: [], files: [] };
    }

    if (currentFolderData) {
      return {
        folders: currentFolderData.subFolders || [],
        files: currentFolderData.files || []
      };
    }

    return { folders: [], files: [] };
  };

  const { folders: currentFolders, files: currentFiles } = getCurrentFolderItems();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your files...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        folders={folders}
        onFolderClick={handleFolderClick}
        currentFolder={currentFolder}
        onEditFolder={handleEditItem}
        onDeleteFolder={handleDeleteItem}
      />

      <div className="flex-1 flex flex-col">
        <Topbar
          onUpload={() => setIsUploadModalOpen(true)}
          onCreateFolder={() => setIsUploadModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="flex-1 overflow-auto">
          <FolderGrid
            folders={currentFolders}
            files={currentFiles}
            onFolderDoubleClick={handleFolderClick}
            onFileDownload={handleFileDownload}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            searchQuery={searchQuery}
          />
        </main>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
        onCreateFolder={handleCreateFolder}
      />
      
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateItem}
        item={selectedItem}
        type={itemType}
      />
      
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        item={selectedItem}
        type={itemType}
      />
    </div>
  );
};

export default DrivePage;