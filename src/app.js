import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';

// import all routes
import authRouter from './routes/auth.router.js'


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

export default app;
