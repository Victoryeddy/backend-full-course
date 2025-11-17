export const handleError = (err, res) => {
//   console.error('Database error:', err); 
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: err.message,
      stack: err.stack,
      code: err.code
    });
  }
  
  // Production - don't expose internal errors
  res.status(500).json({ 
    message: 'Something went wrong. Please try again later.' 
  });
};