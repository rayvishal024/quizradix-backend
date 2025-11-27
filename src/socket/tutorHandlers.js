import joinTutorRoom from "./listeners/joinTutor.listener.js";

export default function registerTutorHandlers(io, socket) {
     socket.on("join_tutor_room", () => joinTutorRoom(io, socket));
}
