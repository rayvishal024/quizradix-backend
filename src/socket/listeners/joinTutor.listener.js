export default function joinTutorRoom(io, socket) {

     // tutor Id using user feild
     const tutorId = socket.user._id.toString();

     // must be tutor user
     if (socket.user.role !== "tutor") {
          return socket.emit("error", { message: "Only tutors can join tutor room" });
     }

     // join into tutor room
     socket.join(`tutor:${tutorId}`);
     console.log(`Tutor ${tutorId} joined tutor:${tutorId}`);

     // emit message
     socket.emit("joined_tutor_room", { tutorId });
}
