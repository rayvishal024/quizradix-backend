export default function joinStudentRoom(io, socket) {

     // student Id using user feild
     const studentId = socket.user._id.toString();

     // must be student
     if (socket.user.role !== "student") {
          return socket.emit("error", { message: "Only students can join student room" });
     }

     // join into room
     socket.join(`student:${studentId}`);
     console.log(`Student ${studentId} joined student:${studentId}`);

     // emit message 
     socket.emit("joined_student_room", { studentId });
}
