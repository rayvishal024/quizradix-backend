import quizModel from "../models/quiz.model.js"
import TestSessionModel from "../models/testSession.model.js"
import { calculateLeaderboard } from "../services/leaderboard.service.js";


export const getStudentResult = async (req, res) => {

     try {
          const { sessionId } = req.params;
          const { studentId } = req.user.id;

          // find session
          const session = await TestSessionModel.findById(sessionId).populate("quizId");

          if (!session) {
               return res.status(404).json({ success: false, message: "Session not found" });
          }

          // finding participats
          const participant = session.participants.find(
               (p) => p.studentId.toString() === studentId);

          if (participant) {
               return res.status(400).json({ success: false, message: "You did not participate in this quiz" });
          }

          return res.status(200)
               .json({
                    success: message,
                    data: {
                         quizTitle: session.quizId.title,
                         totalQuestions: session.quizId.questions.length,
                         score: participant.score,
                         answers: participant.answers
                    }
               });

     } catch (error) {

          console.error("result-student controller :: Student result error:", error);
          return res.status(500).json({ success: false, message: "Failed to fetch result" });
     }
}

export const getTutorResults = async (req, res) => {
     try {
          const sessionId = req.params;
          const tutorId = req.user.id;

          // finding session and populating all details data
          const session = TestSessionModel.findById(sessionId)
               .populate("quizId").
               populate("participants.studentId", "name email");

          if (!session) {
               return res.status(404).json({ success: false, message: "Session not found" });
          }

          if (session.tutorId.toString() !== tutorId) {
               return res.status(403).json({
                    success: false,
                    message: "You are not authorized to view this result"
               });
          }

          // finding leaderboard
          const leaderboard = calculateLeaderboard(session.participants);

          return res.status(200).json({
               success: true,
               data: {
                    quizTitle: session.quizId.title,
                    totalQuestions: session.quizId.questions.length,
                    leaderboard
               }
          });

     } catch (error) {
          console.error("result-tutor controller :: Tutor result error:", error);
          return res.status(500).json({ success: false, message: "Failed to fetch tutor results" });
     }

}