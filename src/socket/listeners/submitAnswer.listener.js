import quizModel from '../../models/quiz.model.js'
import TestSessionModel from '../../models/testSession.model.js'

export default async function submitAnswerListener(io, socket, data) {

    try {
      const { sessionId, studentId, questionIndex, selected } = data;
       
      // finding session
      const session = TestSessionModel.findById(sessionId);
 
      if (session || session.isActive) {
           return socket.emit("quiz_closed", { message: "Quiz has ended" });
      }
 
      // finding quiz
      const quiz = quizModel.findById(session.quizId);
 
      // finding correct answer
      const correctAnswer = quiz.questions[questionIndex].correctAnswer;
 
      // finding participants
      const participant = TestSessionModel.participant.find(
           (p) => p.studentId.toString() === studentId);
      
      if (!participant) return;
 
      // finding existing answer
      const existing = participant.answers.find((a) => a.questionIndex === questionIndex)
 
      if (existing) {
           existing.answer = selected;
           existing.isCorrect = selected === correctAnswer;
      }
      else {
 
           // insert new record
           participant.answers.push({
                questionIndex,
                answer: selected,
                isCorrect: selected === correctAnswer
           })
      }
 
 
      // Update score
      participant.score = participant.answers.filter((a) => a.isCorrect).length;
      await session.save();
 
      // finding leaderboard
      const leaderboard = session.participants.map((p) => ({
           studentId: p.studentId,
           score: p.score
      })).sort((a, b) => b.score - a.score);
 
      // sending response to tutor with leaderboard
      io.to(session.tutorId.toString()).emit("leaderboard_update", leaderboard);
 
      // sending response to all participants with their score
      session.participants.forEach((p) => {
           io.to(p.studentId.toString()).emit("leaderboard_update", leaderboard);
      });
 
    } catch (error) {
         console.log("Error submitAnswerListener - ", error.message);
         return;
    }

}