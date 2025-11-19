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
               
               // Testing event
               socket.on("ping_from_client", () => {
                    console.log("Ping received");
                    socket.emit("pong_from_server", "Hello from server!");
               });

          // handle disconnection
          socket.on("disconnect", () => {
               console.log("Client disconnected:", socket.id);
          });

          // additional event handlers 

     });

     return io;

}