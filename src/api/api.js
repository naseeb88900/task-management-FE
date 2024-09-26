import axios from 'axios';
import { getToken } from '../utils/auth';

// Base URL for API
const API_BASE_URL = 'http://localhost:8080'; // Adjust based on your actual backend URL

// User registration
export const register = async (username, email, password) => {
  return axios.post(`${API_BASE_URL}/auth/register`, {
    username,
    email,
    password,
  });
};

// User login
export const login = async (email, password) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

// Fetch tasks (requires token)
export const getTasks = async () => {
  const token = getToken();
  return axios.get(`${API_BASE_URL}/tasks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Create a new task
export const createTask = async (payload) => {
  const token = getToken();
  return axios.post(
    `${API_BASE_URL}/tasks/`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Update task
export const updateTask = async (taskId, payload) => {
  const token = getToken();
  return axios.put(
    `${API_BASE_URL}/tasks/${taskId}`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Delete task
export const deleteTask = async (taskId) => {
  const token = getToken();
  return axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Fetch tasks (requires token)
export const getUsers = async () => {
    const token = getToken();
    return axios.get(`${API_BASE_URL}/auth/members`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };