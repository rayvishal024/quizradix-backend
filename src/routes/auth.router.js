import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { validateEmail,validateRegistrationData, handleValidationErrors } from '../middlewares/validator.middleware.js';

const router = express.Router();

router.post('/register', validateRegistrationData, handleValidationErrors, registerUser);
router.post('/login', validateEmail, handleValidationErrors, loginUser);

export default router;