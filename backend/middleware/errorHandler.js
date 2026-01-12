export const errorHandler = (err, req, res, next) => {
  // Log error with context
  console.error('❌ Error:', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    body: req.body,
    params: req.params,
    query: req.query
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Don't expose stack trace in production
  const response = {
    success: false,
    error: message
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.details = {
      method: req.method,
      path: req.path
    };
  }

  res.status(statusCode).json(response);
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Async error wrapper
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
