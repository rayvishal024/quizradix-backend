import { Server } from "socket.io";

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
               
               // Tutor joins their own room based on userId
               socket.on("join_Tutor_Room", (tutorId) => {
                    socket.join(tutorId);
                    console.log(`Tutor with ID: ${tutorId} joined their room.`);
               });

               

          // handle disconnection
          socket.on("disconnect", () => {
               console.log("Client disconnected:", socket.id);
          });

          // additional event handlers 

     });

     return io;

}