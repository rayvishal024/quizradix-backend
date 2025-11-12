import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/otp.controller.js';
import { validateEmail, handleValidationErrors } from '../middlewares/validator.middleware.js';


const router = express.Router();

router.post('/sendOTP', validateEmail, handleValidationErrors, sendOTP);
router.post('/verifyOTP', verifyOTP);


export default router;
