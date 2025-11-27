import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socketAuth.middleware.js"
import registerStudentHandlers from "./studentHandlers.js";
import registerTutorHandlers from "./tutorHandlers.js";


// socket server
export function initSocketServer(server) {

     // creating socket server
     const io = new Server(server, {
          cors: { origin: process.env.FRONTEND_ORIGIN || "*" },
          pingInterval: 25000,
          pingTimeout: 60000,
          maxHttpBufferSize: 1e6,
     });

     // auth-socket middleware
     io.use(socketAuthMiddleware);

     io.on("connection", (socket) => {

          // finding user
          const user = socket.user;
          console.log(`Socket connected: ${socket.id} user:${user._id} role:${user.role}`);

          // register grouped handlers
          registerStudentHandlers(io, socket);
          registerTutorHandlers(io, socket);

          socket.on("disconnect", (reason) => {
               console.log(`Socket disconnected: ${socket.id} reason:${reason}`);
          });
     });

     return io;
}
