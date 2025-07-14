import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const uploadBook = async (formData) => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('User not authenticated');

  const response = await axios.post(`${API_BASE}/api/books/upload-book/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,  // <-- Send token here
    },
  });

  return response.data;
};
