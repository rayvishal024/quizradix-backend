import express from "express";
import app from './app.js'
import dotenv from 'dotenv'
import connDB from "./config/db.js";

// configure dotenv
dotenv.config();

// PORT 
const PORT = process.env.PORT || 4000;

connDB()
     .then(() => {
          app.listen(PORT, () => {
               console.log(`Server is Running on PORT ${PORT}`)
          })
     })
     .catch((error) => {
          console.log("Error occurs while Running Server",  error.message)
     })
