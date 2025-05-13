import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const createUser = async (name: string) => {
  const response = await axios.post(`${API_URL}/users`, { name });
  return response.data;
};

export const fetchTasks = async (userId: number) => {
  const response = await axios.get(`${API_URL}/users/${userId}/tasks`);
  return response.data;
};

export const createTask = async (userId: number, description: string) => {
  const response = await axios.post(`${API_URL}/users/${userId}/tasks`, { description });
  return response.data;
};
