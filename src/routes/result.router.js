import express from 'express';
import { isloggedIn, isTutor } from '../middlewares/auth.middleware.js';
import { getStudentResult, getTutorResults } from '../controllers/result.controller.js';


const router = express.Router();


// get student routes 
router.get('/student/:sessionId', isloggedIn, getStudentResult);

// get tutor routes
router.get('/tutor/:sessionId', isloggedIn, isTutor, getTutorResults)

export default router;