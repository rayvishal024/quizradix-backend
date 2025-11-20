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

// validate quiz creation data
export const validateQuizCreationData = [    
     body('title')
          .trim()
          .notEmpty().withMessage('Quiz title is required'),
     body('topic')
          .trim()
          .notEmpty().withMessage('Quiz topic is required'),
     body('questionCount')
          .notEmpty().withMessage('Question count is required')
          .isInt({ min: 1, max: 50 }).withMessage('Question count must be an integer between 1 and 50'),
     body('difficulty')
          .trim()
          .notEmpty().withMessage('Difficulty level is required')
          .isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be either easy, medium, or hard'),
     body('isPublic')
          .optional()
          .isBoolean().withMessage('isPublic must be a boolean value'),
     body('startTime')
          .notEmpty().withMessage('Start time is required')
          .isISO8601().withMessage('Start time must be a valid date'),
     body('endTime')
          .notEmpty().withMessage('End time is required')
          .isISO8601().withMessage('End time must be a valid date'),
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
