import axios from 'axios';
import { getStoredTasks, saveStoredTasks, getStoredStats, saveStoredStats } from './storageServices';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
export const fetchTasksAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE}/tasks`, { timeout: 2000 });
    if (response.data && response.data.success) {
      saveStoredTasks(response.data.data);
      return response.data.data;
    }
  } catch {
    console.warn('Backend API unavailable, using LocalStorage fallback');
  }
  return getStoredTasks();
};
export const addTaskAPI = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE}/tasks`, taskData, { timeout: 2000 });
    if (response.data && response.data.success) {
      const updated = [response.data.data, ...getStoredTasks()];
      saveStoredTasks(updated);
      return response.data.data;
    }
  } catch {
    console.warn('Backend API unavailable, saving locally');
  }
  
  const newTask = {
    id: Date.now().toString(),
    ...taskData,
    completed: false,
    completedByButton: false,
    createdAt: new Date().toISOString(),
    dueDate: taskData.dueDate || new Date().toISOString().split('T')[0]
  };
  const tasks = [newTask, ...getStoredTasks()];
  saveStoredTasks(tasks);
  return newTask;
};
export const updateTaskAPI = async (id, updates) => {
  try {
    const response = await axios.put(`${API_BASE}/tasks/${id}`, updates, { timeout: 2000 });
    if (response.data && response.data.success) {
      const tasks = getStoredTasks().map(t => t.id === id ? response.data.data : t);
      saveStoredTasks(tasks);
      return response.data.data;
    }
  } catch {
    console.warn('Backend API unavailable, updating locally');
  }
  const tasks = getStoredTasks().map(t => {
    if (t.id === id) {
      return { ...t, ...updates };
    }
    return t;
  });
  saveStoredTasks(tasks);
  return tasks.find(t => t.id === id);
};
export const deleteTaskAPI = async (id) => {
  try {
    await axios.delete(`${API_BASE}/tasks/${id}`, { timeout: 2000 });
  } catch {
    console.warn('Backend API unavailable, deleting locally');
  }
  const tasks = getStoredTasks().filter(t => t.id !== id);
  saveStoredTasks(tasks);
  return true;
};
export const fetchStatsAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE}/stats`, { timeout: 2000 });
    if (response.data && response.data.success) {
      saveStoredStats(response.data.data);
      return response.data.data;
    }
  } catch {
    console.warn('Backend API unavailable, using LocalStorage stats');
  }
  return getStoredStats();
};
export const updateStatsAPI = async (statsUpdate) => {
  const current = getStoredStats();
  const updated = { ...current, ...statsUpdate };
  saveStoredStats(updated);
  try {
    await axios.post(`${API_BASE}/stats/streak`, statsUpdate, { timeout: 2000 });
  } catch {
    // Silent fallback
  }
  return updated;
};