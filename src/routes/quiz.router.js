import express from 'express';
import { isloggedIn, isTutor } from '../middlewares/auth.middleware.js';
import { createQuiz, deleteQuiz, getTutorQuizzes } from '../controllers/quiz.controller.js';
import { validateQuizCreationData, handleValidationErrors } from "../middlewares/validator.middleware.js";
import { enrollInQuiz } from '../controllers/quiz.controller.js';

const router = express.Router();


// create quiz route
router.post('/create-quiz',
     isloggedIn, isTutor,
     validateQuizCreationData, handleValidationErrors,
     createQuiz);


// get tutor quiz route
router.get('/tutor-quiz', isloggedIn, isTutor, getTutorQuizzes);

// delete quiz route
router.delete('/delete-quiz', isloggedIn, isTutor, deleteQuiz);

// enroll in quiz route
router.post("/enroll", isloggedIn,  enrollInQuiz);

// test route
router.get('/test', isloggedIn, isTutor, (req, res) => {
     res.json({
          message: "Auth route is working",
     });
});


export default router;