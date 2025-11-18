import express from 'express';
import { isloggedIn, isTutor } from '../middlewares/auth.middleware.js';
import { createQuiz, deleteQuiz, getTutorQuizzes } from '../controllers/quiz.controller.js';


const router = express.Router();

// create quiz route
router.post('/create-quiz', isloggedIn, isTutor, createQuiz);

// get tutor quiz route
router.get('/tutor-quiz', isloggedIn, isTutor, getTutorQuizzes);

router.delete('/delete-quiz', isloggedIn, isTutor, deleteQuiz);

export default router;