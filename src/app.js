import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import rateLimit from "express-rate-limit";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const swaggerFile = require("../swagger-output.json");
import swaggerUi from "swagger-ui-express";


// import all routes
import authRouter from './routes/auth.router.js'
import otpRouter from './routes/otp.router.js'
import quizRouter from './routes/quiz.router.js'
import resultRouter from './routes/result.router.js'

// global error Handler
import errorHandler from './middlewares/errorHandler.middleware.js'


const app = express();

// setup - middleware

// rate limiter
app.use(rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 200,
}));

// cors
app.use(cors({
     "origin": process.env.FRONTEND_ORIGIN ,
     "methods": "GET,PUT,PATCH,POST,DELETE",
     "preflightContinue": false,
     "optionsSuccessStatus": 204
}));

// helmet
app.use(helmet());


// body & cookie-parser parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// swagger set-up for documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


// set-up routes
app.use('/api/auth', authRouter);
app.use('/api/otp', otpRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/result', resultRouter);


app.use(errorHandler)

// Root endpoint
app.get("/", (req, res) => {
     res.json({
          message: "QuizRadix API",
          version: "1.0.0",
          endpoints: {
               auth: "/api/auth",
               otp: "/api/otp",
               quiz: "/api/quiz",
               result: "/api/result"
          },
     });
});



export default app;
