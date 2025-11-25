
export default function registerTutorHandlers(io, socket) {
     socket.on('join_tutor_room', (tutorId) => {
          console.log("Tutor join room", tutorId);
     })
}