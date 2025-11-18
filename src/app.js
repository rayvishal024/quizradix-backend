import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';


// import all routes
import authRouter from './routes/auth.router.js'
import otpRouter from './routes/otp.router.js'
import quizRouter from './routes/quiz.router.js'


const app = express();

// setup - middleware
app.use(cors({
     "origin": process.env.CORS_ORIGIN ,
     "methods": "GET,PUT,PATCH,POST,DELETE",
     "preflightContinue": false,
     "optionsSuccessStatus": 204
}));
app.use(helmet());


// body & cookie-parser parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// set-up routes
app.use('/api/auth', authRouter);
app.use('/api/otp', otpRouter);
app.use('/api/quiz', quizRouter);

// Root endpoint
app.get("/", (req, res) => {
     res.json({
          message: "QuizRadix API",
          version: "1.0.0",
          endpoints: {
               auth: "/api/auth",
               otp: "/api/otp",
               quiz: "/api/quiz",
          },
     });
});

export default app;
