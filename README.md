# 🚀 quizRadix — Backend

A scalable, production-ready backend for **quizRadix**, a real-time AI-powered quiz platform built with Node.js, Express, MongoDB, Socket.io, and Gemini AI.

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
- Google Gemini AI (AI quiz generator)

**Auth & Security**
- JWT Access Tokens  
- Password Hashing (bcrypt)  
- OTP Email Verification  
- Role-based Permissions  

---

## ⚙️ Features Overview

### 👤 **User Authentication**
- Register with email + password  
- OTP email verification before activation  
- JWT Login  
- Roles: **Tutor**, **Student**

### 🧑‍🏫 **Tutor Features**
- Create manual quizzes  
- Generate AI-powered quizzes (Gemini)  
- Start real-time test sessions  
- View connected students live  
- Send questions live  
- Live leaderboard updates  

### ✅ **Student Features**
- Join test using joinCode  
- Receive real-time questions  
- Submit answers live  
- View updated leaderboard  

### ✅ **AI Quiz Generation**
- Powered by Gemini 1.5 Flash  
- Topic + question count + custom instructions  
- Strict JSON output  
- Auto validation  
- Auto-save as a quiz  

---

## 🚀 Quick Start

### 📦 Prerequisites
- Node.js (v18+)  
- npm (or yarn)  
- MongoDB (local or cloud)  

### ⚙️ Install Dependencies
```bash
npm install
```

#### ▶️ Run Development Server
```bash
npm run dev
```

### 🔐 Environment Variables
```
 cp .env example.env
```

## 📂 Project Structure
```
backend-api/
├── src/
│   ├── config/          # Configuration (database, geminiAI)
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, error handling, express Validator
│   ├── models/          # Database models & Schema
|   ├── prompt/          # Prompt structure
│   ├── routes/          # API route definitions
|   ├── socket/          # Socket.io configuration
|   ├── utils/           # mailSender, quizGenerator
│   |── app.js           # Express app 
│   └── server.js        # Server entry point
│── .env
│── package-lock.json
└── package.json

```

## 🧪 Testing

```
npm run test
npm run test:watch
```

## 📚 API Reference

### Auth
- POST /auth/register
- POST /auth/verify-otp
- POST /auth/login

### Quiz
- POST /api/quizzes/create              
- GET  /api/quizzes/my-quizzes
- DELETE /api/quizzes/:id

### Real-Time Test (Socket.io + REST)
- POST /api/test/start
- POST /api/test/end
- GET  /api/test/session/:joinCode

## 📄 License

MIT
Open-source and free to modify.

## 💙 Contributing

Pull requests are welcome!
If suggesting major changes, please open an issue first.

## ⭐ Author
Developed by @Vishal <br>
Backend for the MERN-based quizRadix platform.