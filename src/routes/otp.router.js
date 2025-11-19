import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/otp.controller.js';
import { validateEmail, handleValidationErrors } from '../middlewares/validator.middleware.js';


const router = express.Router();

router.post('/sendOTP', validateEmail, handleValidationErrors, sendOTP);
router.post('/verifyOTP', verifyOTP);

router.get('/test',  (req, res) => {
     res.json({
          message: "OTP route is working",
     });
});

export default router;
