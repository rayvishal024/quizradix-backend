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

     enrollments: [
          {
               studentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
               },

               enrolledAt: {
                    type: Date,
                    default: Date.now
               }
          }
     ],

     startTime: {
          type: Date,
          required: true
     },

     endTime: {
          type: Date,
          required: true
     },

     createdAt: {
          type: Date,
          default: Date.now,
     },
});


const quizModel = mongoose.model("Quiz", quizSchema);

export default quizModel;