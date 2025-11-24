import cron from 'node-cron';
import QuizModel from '../models/quiz.model.js';
import TestSessionModel from '../models/testSession.model.js';


export function scheduleQuizTasks(io) {

     // Schedule a task to run every 30 seconds for auto start quiz
     cron.schedule('*/30 * * * * *', async () => {
         
          const now = new Date();

          // find all quizzes that starting time less than now and not yet started

          const quizzes = await QuizModel.find({
               startTime: { $lte: now },
               "metadata.hasStarted": { $ne: true },
          });


          // traverse through each quiz and start it
          for (const quiz of quizzes) {
               
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

     // schedule another task for auto end quiz
     cron.schedule('*/30 * * * * *', async () => {

          // finding current date
          const now = new Date();

          // check for any schedule quiz for end
          const quizzes = await QuizModel.find({
               endTime: { $lte: now },
               "metadata.hasStarted": true,
               "metadata.hasEnded": { $ne: true }
          });

          // travserse all quiz and perform operation
          for (const quiz of quizzes) {
              
               // marks quiz has end and save
               quiz.metadata.hasEnded = true;
               await quiz.save();

               // finding active session
               const session = await TestSessionModel.findOne(
                    {
                         quizId: quiz._id, 
                         isActive : true
                    });

               // session not found 
               if (!session) continue;

               // marks session Inactive now and save
               session.isActive = false;
               await session.save();

               // sending notification to all student
               quiz.enrollments.forEach((enrollment) => {
                    io.to(enrollment.studentId.toString()).emit("quiz_ended", {
                         message: "Quiz has Ended",
                         sessionId: session._id,
                         quizId : quiz._id
                   })
               })
               
               // sending notification to tutor
               io.to(quiz.tutorId.toString()).emit("quiz_complete", {
                    quizId: quiz._id,
                    sessionId: session._id
               })

               console.log(`Quiz ended: ${quiz.title}`);

               // calculate answer & save
               session.participants.forEach((e) => {
                    e.score = e.answers.filter(p => p.isCorrect).length
               })
               await session.save();

          }
     })
} 