import { body, validationResult } from 'express-validator';

// validator email
export const validateEmail = [
     body('email')
          .trim()
          .notEmpty().withMessage('Email is required')
          .isEmail().withMessage('Invalid email format')
          .normalizeEmail(),
]

// validate registration data
export const validateRegistrationData = [
     body('email')
          .trim()
          .notEmpty().withMessage('Email is required')
          .isEmail().withMessage('Invalid email format')
          .normalizeEmail(),
     body('password')
          .notEmpty().withMessage('Password is required')
          .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
     body('name')
          .trim()
          .notEmpty().withMessage('Name is required')
          .matches(/^[a-zA-Z\s]+$/)
          .withMessage('Name can only contain letters and spaces'),
     body('role')
          .optional()
          .isIn(['student', 'tutor']).withMessage('Role must be either student or tutor'),
]

// handle validation errors
export const handleValidationErrors = (req, res, next) => {
     const errors = validationResult(req);    
     if (!errors.isEmpty()) {
          return res.status(400).json({
               success: false,
               errors: errors.array().map(err => err.msg),
          });
     }    
     next();
}    
