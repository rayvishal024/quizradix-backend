import joinStudentRoom from "./listeners/joinStudent.listener.js";
import submitAnswerListener from "./listeners/submitAnswer.listener.js";
// import heartbeatListener from "./listeners/heartbeat.listener.js";

export default function registerStudentHandlers(io, socket) {

     // join student room
     socket.on("join_student_room", () => joinStudentRoom(io, socket));

     // submit answer
     socket.on("submit_answer", (data) => submitAnswerListener(io, socket, data));

     // heartbeat
    //  socket.on("heartbeat", (data) => heartbeatListener(io, socket, data));
}
