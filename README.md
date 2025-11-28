# 🚀 quizRadix — Backend

A scalable, production-ready backend for quizRadix, a real-time AI-powered quiz and examination platform built using Node.js, Express, MongoDB, Socket.io, and Gemini AI.

This backend supports:
- Secure authentication (JWT + OTP email verification)
- Role-based access (Tutor / Student)
- Manual quiz creation & management
- AI-powered quiz generation using Google Gemini
- Real-time test sessions (Socket.io)
- Leaderboard, live scoring, and student participation tracking


---

## 📌 Tech Stack

**Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Socket.io (real-time engine)  
- Node-cron (Task Schedular)
- Google Gemini AI (AI quiz generator)

 **👤 Authentication & Security**

- Secure JWT-based authentication
- OTP email verification during registration
- Password hashing with bcrypt
- Role-based access (Tutor / Student)
- Protected routes
- Input validation (express-validator)  

---

## ⚙️ Features Overview

### 🧑‍🏫 **Tutor Features**

- Create manual quizzes  
- Generate AI-powered quizzes (Gemini)  
- Start real-time test sessions  
- View connected students live  
- Send questions live  
- Live leaderboard updates  

### 👤 **Student Features**

- Join test using joinCode  
- Receive real-time questions  
- Submit answers live  
- View updated leaderboard  

### 🤖 **AI Quiz Generation**
Using Google Gemini API, features include:

- Powered by Gemini 1.5 Flash  
- Topic + question count + custom instructions  
- Strict JSON output  
- Auto validation  
- Auto-save as a quiz  

### ⚡ **Real-Time Engine**
Built with Socket.io, includes:

- Authenticated socket connection
- Student & tutor private rooms
- Real-time quiz start/end events
- Live scoring engine
- Real-time leaderboard updates
- Secure answer submission
- Session-level broadcasting

### ⏱ **Task Scheduler**
Using node-cron to:

- Auto-start quizzes at scheduled time
- Auto-end sessions
- Send email reminders before quiz start


---

## 🚀 Installation & Setup

### 📦 Prerequisites
- Node.js (v18+)  
- npm (or yarn)  
- MongoDB (local or cloud)  

### 💻 Clone Repository

```bash
git clone https://github.com/yourusername/quizRadix-backend.git
cd quizRadix-backend
```

### ⚙️ Install Dependencies
```bash
npm install
```

### 🔐 Environment Variables
```
 cp .env example.env
```

### ▶️ Run Development Server
```bash
npm run dev
```

## 📂 Project Structure
```
src/
├── config/           # DB connection, Gemini setup
├── controllers/      # Route controllers (Auth, Quiz, Session, Results)
├── middleware/       # Auth, Validation, Error handlers
├── models/           # Mongoose schemas (User, Quiz, TestSession)
├── prompt/           # Gemini prompt templates
├── routes/           # REST API routes
├── schedular/        # Backend task schedular
├── services/         # Leaderboard, Scoring service
├── socket/           # Socket.io setup, handlers, listeners
├── utils/            # Mail sender, Quiz generator, helpers
├── app.js            # Express configuration
└── server.js         # Server + Socket.io initialization


```

## 📡 API Reference

### Auth Routes
- POST /auth/register
- POST /auth/login

### OTP Routes
- POST /api/otp/sendOTP
- POST /api/otp/verifyOTP

### Quiz Routes
- POST /api/quiz/create-quiz             
- GET  /api/quiz/tutor-quiz
- POST /api/quiz/enroll
- DELETE /api/quiz/:id

### Result Routes
- GET /api/result/student/:sessionId
- GET /api/result/tutor/:sessionId

## 📘 API Documentation (Swagger)

The project includes automatically generated API documentation using swagger-autogen and Swagger UI.
To view the API docs:
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
     http://localhost:4000/api-docs
     ```


## 🧪 Testing

```
npm run test
npm run test:watch
```

## 📄 License

MIT License — free to use, modify & distribute.

## 💙 Contributing

Pull requests are welcome!
If suggesting major changes, please open an issue first.

## ⭐ Author
Developed by @Vishal <br>
Backend for the MERN-based quizRadix platform.