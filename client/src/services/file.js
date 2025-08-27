import api from './api';

export const uploadFile = async (formData) => {
  const response = await api.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getFiles = async (userId) => {
  const response = await api.get(`/file/${userId}`);
  return response.data;
};

export const updateFile = async (id, name) => {
  const response = await api.put(`/file/update/${id}`, { name });
  return response.data;
};

export const deleteFile = async (id) => {
  const response = await api.delete(`/file/delete/${id}`);
  return response.data;
};