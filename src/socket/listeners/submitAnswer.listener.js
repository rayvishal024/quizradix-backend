import TestSessionModel from "../../models/testSession.model.js";
import quizModel from "../../models/quiz.model.js";
import { calculateLeaderboard } from "../../services/leaderboard.service.js";


export default async function submitAnswerListener(io, socket, data) {
     try {

          // validate payload minimal
          const { sessionId, questionIndex, selected } = data || {};

          if (!sessionId || questionIndex === undefined || selected === undefined) {
               return socket.emit("error", { message: "Invalid payload for submit_answer" });
          }

          // ensure role
          if (socket.user.role !== "student") {
               return socket.emit("error", { message: "Only students can submit answers" });
          }


          const studentId = socket.user._id.toString();

          // load session and quiz
          const session = await TestSessionModel.findById(sessionId);

          if (!session || !session.isActive) {
               return socket.emit("quiz_closed", { message: "Quiz is not active" });
          }

          // ensure participant exists
          const participant = session.participants.find(p => p.studentId.toString() === studentId);

          // Not registered 
          if (!participant) {
               return socket.emit("error", { message: "You are not registered in this session" });
          }

          
          // pull correct answer from Quiz 
          const quiz = await quizModel.findById(session.quizId).lean();

        // quiz not exist
          if (!quiz) {
               return socket.emit("error", { message: "Quiz not found" });
}

          // finding all question
          const question = quiz.questions[questionIndex];
          
          if (!question) return socket.emit("error", { message: "Question index invalid" });

          // update or insert answer
          const existing = participant.answers.find(a => a.questionIndex === questionIndex);

          const isCorrect = question.correctAnswer === selected;


          if (existing) {
               existing.answer = selected;
               existing.isCorrect = isCorrect;
          } else {
               participant.answers.push({ questionIndex, answer: selected, isCorrect });
          }

          // update score
          participant.score = participant.answers.filter(a => a.isCorrect).length;

          await session.save();

          // broadcast leaderboard to session room & tutor
          const leaderboard = calculateLeaderboard(session.participants);
          io.to(`session:${sessionId}`).emit("leaderboard_update", leaderboard);
          io.to(`tutor:${session.tutorId.toString()}`).emit("leaderboard_update", leaderboard);

          
     } catch (err) {
          
          console.error("submitAnswerListener err:", err);
          socket.emit("error", { message: "Server error on submit_answer" });
     }
}
