import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../utils/api.js';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: '',
    category: '',
    search: '',
    sort: 'date_newest'
  });

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskAPI.getTasks(filters);
      setTasks(response.tasks || []);
      setStats(response.stats || stats);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Add task
  const addTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      await fetchTasks();
      return { success: true, task: response.task };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      const response = await taskAPI.updateTask(id, taskData);
      await fetchTasks();
      return { success: true, task: response.task };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      await fetchTasks();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to delete task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Toggle completion
  const toggleComplete = async (id) => {
    try {
      const response = await taskAPI.toggleComplete(id);
      await fetchTasks();
      return { success: true, task: response.task };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to toggle task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      status: 'all',
      priority: '',
      category: '',
      search: '',
      sort: 'date_newest'
    });
  };

  const value = {
    tasks,
    stats,
    loading,
    error,
    filters,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    updateFilters,
    clearFilters,
    fetchTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

