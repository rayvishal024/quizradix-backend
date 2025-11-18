import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
     tutorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
     },
     title: {
          type: String,
          required: true,
     },
     topic: {
          type: String,
          required: true,
     },
     questions: [
          {
               questionText: String,
               options: [String],
               correctAnswer: String,
          }
     ],
     isPublic: {
          type: Boolean
     },
     joinCode: String,
     createdAt: {
          type: Date,
          default: Date.now,
     },
});


const quizModel = mongoose.model("Quiz", quizSchema);

export default quizModel;