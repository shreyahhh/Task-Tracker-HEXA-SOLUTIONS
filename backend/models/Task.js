import db from '../config/db.js';

export const Task = {
  // Get all tasks with optional filters
  findAll(filters = {}) {
    let tasks = db.findAll();

    // Apply filters
    if (filters.status === 'completed') {
      tasks = tasks.filter(task => task.is_completed === true);
    } else if (filters.status === 'pending') {
      tasks = tasks.filter(task => task.is_completed === false);
    }

    if (filters.priority) {
      tasks = tasks.filter(task => task.priority === filters.priority);
    }

    if (filters.category) {
      tasks = tasks.filter(task => task.category === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      tasks = tasks.filter(task => 
        task.title?.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'date_newest':
          tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'date_oldest':
          tasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        case 'priority':
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          tasks.sort((a, b) => 
            (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
          );
          break;
        case 'alphabetical':
          tasks.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
          break;
        default:
          tasks.sort((a, b) => {
            if (a.position !== b.position) return a.position - b.position;
            return new Date(b.created_at) - new Date(a.created_at);
          });
      }
    } else {
      tasks.sort((a, b) => {
        if (a.position !== b.position) return a.position - b.position;
        return new Date(b.created_at) - new Date(a.created_at);
      });
    }

    return tasks;
  },

  // Get single task by ID
  findById(id) {
    return db.findById(id);
  },

  // Create new task
  create(taskData) {
    return db.create(taskData);
  },

  // Update task
  update(id, taskData) {
    return db.update(id, taskData);
  },

  // Delete task
  delete(id) {
    return db.delete(id);
  },

  // Toggle completion status
  toggleComplete(id) {
    const task = this.findById(id);
    if (!task) return null;
    return this.update(id, { is_completed: !task.is_completed });
  },

  // Get statistics
  getStats() {
    const allTasks = db.findAll();
    const total = allTasks.length;
    const completed = allTasks.filter(t => t.is_completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Stats by priority
    const priorityStats = ['high', 'medium', 'low'].map(priority => ({
      priority,
      count: allTasks.filter(t => t.priority === priority).length
    })).filter(stat => stat.count > 0);

    // Stats by category
    const categoryMap = {};
    allTasks.forEach(task => {
      const cat = task.category || 'uncategorized';
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    const categoryStats = Object.entries(categoryMap).map(([category, count]) => ({
      category,
      count
    }));

    return {
      total,
      completed,
      pending,
      completionRate,
      byPriority: priorityStats,
      byCategory: categoryStats
    };
  }
};
