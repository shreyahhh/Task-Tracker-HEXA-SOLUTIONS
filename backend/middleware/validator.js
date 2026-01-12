export const validateTask = (req, res, next) => {
  try {
    const { title, description, priority, category, due_date } = req.body;

    // Validate title
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Title is required and must be a non-empty string'
      });
    }

    if (title.length > 255) {
      return res.status(400).json({
        success: false,
        error: 'Title must be 255 characters or less'
      });
    }

    // Validate description
    if (description !== undefined && description !== null) {
      if (typeof description !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Description must be a string'
        });
      }
      if (description.length > 1000) {
        return res.status(400).json({
          success: false,
          error: 'Description must be 1000 characters or less'
        });
      }
    }

    // Validate priority
    if (priority !== undefined && priority !== null) {
      if (!['high', 'medium', 'low'].includes(priority)) {
        return res.status(400).json({
          success: false,
          error: 'Priority must be high, medium, or low'
        });
      }
    }

    // Validate category
    if (category !== undefined && category !== null) {
      if (typeof category !== 'string' || category.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Category must be a non-empty string'
        });
      }
      if (category.length > 50) {
        return res.status(400).json({
          success: false,
          error: 'Category must be 50 characters or less'
        });
      }
    }

    // Validate due_date
    if (due_date !== undefined && due_date !== null && due_date !== '') {
      const date = new Date(due_date);
      if (isNaN(date.getTime())) {
        return res.status(400).json({
          success: false,
          error: 'Due date must be a valid date'
        });
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid request data'
    });
  }
};

