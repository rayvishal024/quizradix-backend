import express from "express";
import app from './app.js'
import dotenv from 'dotenv'
import connDB from "./config/db.js";
import http from 'http';
import { initializeSocketServer } from "./socket/socketserver.js";

// configure dotenv
dotenv.config();

// create http server
const server = http.createServer(app);

// initialize socket server
initializeSocketServer(server);

// PORT 
const PORT = process.env.PORT || 4000;

// connect to DataBase and start server
connDB()
     .then(() => {
          server.listen(PORT, () => {
               console.log(`Server is Running on PORT ${PORT}`)
          })
     })
     .catch((error) => {
          console.log("Error occurs while Running Server",  error.message)
     })