import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { validateEmail,validateRegistrationData, handleValidationErrors } from '../middlewares/validator.middleware.js';
import { isloggedIn } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', validateRegistrationData, handleValidationErrors, registerUser);
router.post('/login', validateEmail, handleValidationErrors, loginUser);


router.get('/test', isloggedIn, (req, res) => {
     res.json({
          message: "Auth route is working",
     });
});

export default router;