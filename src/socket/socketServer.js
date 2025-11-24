import { Server } from "socket.io";
import TestSessionModel from "../models/testSession.model.js";

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
               
               // Tutor joins their own room based on userId
               socket.on("join_Tutor_Room", (tutorId) => {
                    socket.join(tutorId);
                    console.log(`Tutor with ID: ${tutorId} joined their room.`);
               });

               // student for quiz started
               socket.on("quiz_Started", (studentId) => {
                    socket.join(studentId);
                    console.log(`Student with ID: ${studentId} joined their room.`);
               })

               // tutor for quiz live now
               socket.on("quiz_live_now", (tutorId) => {
                    socket.join(tutorId);
               })
    
               socket.on("submit_answer", async ({ sessionId, studentId, ...rest }) => {
                    const session = await TestSessionModel.findById(sessionId);

                    if (!session || !session.isActive) {
                         return socket.emit("quiz_closed", { message: "Quiz has ended!" });
                    }

               });


          // handle disconnection
          socket.on("disconnect", () => {
               console.log("Client disconnected:", socket.id);
          });

     });

     return io;

}