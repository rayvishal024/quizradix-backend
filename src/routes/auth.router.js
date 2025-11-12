import express from 'express'
import { registerUser } from '../controllers/auth.controller.js';
import { validateRegistrationData, handleValidationErrors } from '../middlewares/validator.middleware.js';

const router = express.Router();

router.post('/register', validateRegistrationData, handleValidationErrors, registerUser);

export default router;