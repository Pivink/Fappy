import api from './api';

export const createFolder = async (userId, { name, parent = null }) => {
  console.log("in create folder",userId);
  const response = await api.post(`/folder/create/${userId}`, { name, parent });
  return response.data;
};

export const getUserFolders = async (userId) => {
  const response = await api.get(`/folder/getfolder/${userId}`);
   return response.data;
};

export const getFolderById = async (folderId) => {
  const response = await api.get(`/folder/getfolderid/${folderId}`);
  console.log("Folder by id data: ",response.data);
  return response.data;
};

export const updateFolder = async (folderId, name) => {
  const response = await api.put(`/folder/update/${folderId}`, { name });
  return response.data;
};

export const deleteFolder = async (folderId) => {
  const response = await api.delete(`/folder/delete/${folderId}`);
  return response.data;
};