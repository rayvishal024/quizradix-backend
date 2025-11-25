import submitAnswerListener from './listeners/submitAnswer.listener.js'

export default function registerStudentHandlers(io, socket) {

     socket.on("join_student_room", (studentId) =>
          console.log("New Student join", studentId)
     );

     socket.on("submit_answer", (data) =>
          submitAnswerListener(io, socket, data)
     );
}