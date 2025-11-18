import mongoose from 'mongoose';

export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${paramName} format`,
        details: 'ID must be a 24-character hexadecimal string'
      });
    }
    next();
  };
};

export const validateBookId = validateObjectId('id');
