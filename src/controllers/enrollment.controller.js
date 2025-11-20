import quizModel from "../models/quiz.model.js";

export const enrollInQuiz = async (req, res) => {

     try {
          // user id from request
          const studentId = req.user.id;
          const { quizId, joinCode } = req.body;

          // finding quiz
          const quiz = await quizModel.findById(quizId);
          if (!quiz) {
               return res.status(404).json({
                    success: false,
                    message: "Quiz not found",
               });
          }

          // checking quiz public or private
          if (!quiz.isPublic) {
               // if private quiz, check join code
               if (quiz.joinCode !== joinCode) {
                    return res.status(400).json({
                         success: false,
                         message: "Invalid join code for private quiz",
                    });
               }
          }

          // check if already enrolled
          const alreadyEnrolled = quiz.enrollments.some((e) => e.studentId.toString() === studentId);

          if (alreadyEnrolled) {
               return res.status(400).json({
                    success: false,
                    message: "Already enrolled in this quiz",
               });
          }

          // add enrollment
          quiz.enrollments.push({ studentId });
          await quiz.save();

          return res.status(200).json({
               success: true,
               message: "Enrolled in quiz successfully",
          });

     } catch (error) {

          console.error("Error in enrollInQuiz:", error.message);

          return res.status(500).json({
               success: false,
               message: "Failed to enroll in quiz",
          });

     }



}