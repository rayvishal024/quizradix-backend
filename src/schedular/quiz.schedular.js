import cron from 'node-cron';
import QuizModel from '../models/quiz.model.js';
import TestSessionModel from '../models/testSession.model.js';


export function scheduleQuizTasks(io) {

     // Schedule a task to run every 30 seconds
     cron.schedule('*/30 * * * * *', async () => {
         
          const now = new Date();

          // find all quizzes that starting time less than now and not yet started

          const quizzes = await QuizModel.find({
               startTime: { $lte: now },
               "metadata.hasStarted": { $ne: true },
          });

          


          // traverse through each quiz and start it
          for (const quiz of quizzes) {

               console.log(quiz)

               
               quiz.metadata.hasStarted = true;
               await quiz.save();

               // create test Session for quiz
               const session = await TestSessionModel.create({
                    quizId: quiz._id,
                    tutorId: quiz.tutorId,
                    joinCode: quiz.joinCode,
                    isActive: true,
                    particapants: quiz.enrollments.map((enrollment) => ({
                         studentId: enrollment.studentId,
                         score: 0,
                         answers: [],
                    })),
               });


               // find quizData for questions & enrollments count
               const quizData = await QuizModel.findById(quiz._id);


               // emit event to all enroll student about quiz started
               quiz.enrollments.forEach((enrollment) => {

                    // emit to each student
                    io.to(enrollment.studentId.toString()).emit('quiz_Started', {
                         quizId: quiz._id,
                         sessionId: session._id,
                         questions: quizData.questions,
                         startTime: quiz.startTime,
                         endTime: quiz.endTime,
                    })

               });

               // emit event to tutor about quiz started
               io.to(quiz.tutorId.toString()).emit('quiz_live_now', {
                    quizId: quiz._id,
                    sessionId: session._id,
                    enrollmentCount: quiz.enrollments.length,
                    startTime: quiz.startTime,
                    endTime: quiz.endTime,
               });

          }

     });
}