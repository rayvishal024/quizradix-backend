import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/otp.controller.js';
import { validateEmail, handleValidationErrors } from '../middlewares/validator.middleware.js';


const router = express.Router();

// #swagger.tags = ['otp']

// send and verify otp routes
router.post('/sendOTP', validateEmail, handleValidationErrors, sendOTP);

router.post('/verifyOTP', verifyOTP);

// test route
router.get('/test',  (req, res) => {
     res.json({
          message: "OTP route is working",
     });
});

export default router;
