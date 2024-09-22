import axios from 'axios';

// Set the base URL for your backend API
axios.defaults.baseURL = 'http://localhost:4000';

// Create an Axios instance
const api = axios.create({
  baseURL: axios.defaults.baseURL,
});

// Define API methods to interact with the backend
export const getNotes = () => api.get('/notes');
export const getNoteById = (id: string) => api.get(`/notes/${id}`);
export const createNote = (note: { title: string; content: string }) => api.post('/notes', note);
export const updateNote = (id: string, note: { title: string; content: string }) => api.put(`/notes/${id}`, note);
export const deleteNote = (id: string) => api.delete(`/notes/${id}`);

export default api;
