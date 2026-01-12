import { Task } from '../models/Task.js';

export const getTasks = async (req, res, next) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      category: req.query.category,
      search: req.query.search,
      sort: req.query.sort
    };

    const tasks = Task.findAll(filters);
    const stats = Task.getStats();

    res.json({
      success: true,
      tasks,
      stats
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.json({
      success: true,
      task
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = Task.create(req.body);
    res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = Task.update(req.params.id, req.body);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.json({
      success: true,
      task
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    Task.delete(req.params.id);
    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const toggleComplete = async (req, res, next) => {
  try {
    const task = Task.toggleComplete(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.json({
      success: true,
      task
    });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = Task.getStats();
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    next(error);
  }
};

