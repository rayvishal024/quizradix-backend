import { Server } from "socket.io";
import registerStudentHandlers from './studentHandlers.js'
import registerTutorHandlers from './tutorHandlers.js'


// initialize socket server
export function initializeSocketServer(server) {

     // create socket server
     const io = new Server(server, {
          cors: {
               origin: "*",
               methods: ["GET", "POST"],
          },
     });
    
          // handle socket connection
          io.on("connection", (socket) => {
               console.log("New client connected:", socket.id);
               

               registerStudentHandlers(io, socket);
               
               
              registerTutorHandlers(io, socket);


          // handle disconnection
          socket.on("disconnect", () => {
               console.log("Client disconnected:", socket.id);
          });

     });

     return io;

}