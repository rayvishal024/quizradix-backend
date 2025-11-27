import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function socketAuthMiddleware(socket, next) {

     try {

          // recieve token
          const token = socket.handshake.auth && socket.handshake.auth.token;
          if (!token) return next(new Error("Authentication required"));

      // finding payload via jwt token
          const payload = jwt.verify(token, process.env.JWT_SECRET);

          // finding user
          const user = await userModel.findById(payload.id).select("-password");
          if (!user) return next(new Error("Invalid token"));

          // adding user feild 
          socket.user = user; 
          return next();

     } catch (err) {
          console.error("Socket auth error:", err.message);

          return next(new Error("Authentication error"));
     }
}
