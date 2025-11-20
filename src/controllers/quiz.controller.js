import quizModel from "../models/quiz.model.js";
import otpgenerator from "otp-generator";
import {generateQuiz} from "../utils/generateQuiz.js";


// create quiz controller
export const createQuiz = async (req, res) => {
     
     try {
          const { title, topic, questionCount, difficulty, isPublic, customMessage, startTime, endTime } = req.body;

          // get tutor id from authenticated user
          const tutorId = req.user.id;
          
          // generate join code
          const joinCode = otpgenerator.generate(6, {
               digits: true,
               lowerCaseAlphabets: false,
               upperCaseAlphabets: true,
               specialChars: false,
          });

          let questions = [];
          
          questions = await generateQuiz(topic, questionCount, difficulty, customMessage);

          // create new quiz
          const newQuiz = new quizModel({
               tutorId,
               title,
               topic,
               questions,
               isPublic,
               joinCode,
               startTime,
               endTime
          });

          // save quiz to database
          await newQuiz.save();

          // sending success response
          return res.status(201).json({
               success: true,
               message: "Quiz created successfully",
               quiz: newQuiz,
          });

     } catch (error) {

          console.error("Error in createQuiz:", error.message);

          // sending error response
          return res.status(500).json({
               success: false,
               message: "Internal Server Error",
          });
     }
}


// get quizzes controller
export const getTutorQuizzes = async (req, res) => {
     try {

          // get tutor id from authenticated user
          const tutorId = req.user.id;

          // fetch quizzes created by the tutor
          const quizzes = await quizModel.find({ tutorId });

          return res.status(200).json({
               success: true,
               quizzes,
          });

         
     } catch (error) {
          console.error("Error in getQuizzes:", error.message);
          return res.status(500).json({
               success: false,
               message: "Internal Server Error",
          });
     }
}

// delete quiz controller
export const deleteQuiz = async (req, res) => {
     try {
          // quiz id from request body
          const { quizId } = req.body;

          // get tutor id from authenticated user
          const tutorId = req.user.id;

          // find and delete the quiz
          const deletedQuiz = await quizModel.findOneAndDelete({ _id: quizId, tutorId });

          // if quiz not found or tutor doesn't own the quiz
          if (!deletedQuiz) {
               return res.status(404).json({
                    success: false,
                    message: "Quiz not found or you don't have permission to delete this quiz",
               });
          }

          // sending success response
          return res.status(200).json({
               success: true,
               message: "Quiz deleted successfully",
          });

     } catch (error) {
          console.error("Error in deleteQuiz:", error.message);

          // sending error response
          return res.status(500).json({
               success: false,
               message: "Internal Server Error",
          });
     }
}