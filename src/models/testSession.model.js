import mongoose from "mongoose";

// participant schema
const participantSchema = new mongoose.Schema({
     studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
     },
     score: {
          type: Number,
          default: 0,
     },
     answers: [
          {    
               questionIndex: Number, // which question they answered
               answer: String,        // their answer choice
               isCorrect: Boolean
          }
     ],
});
       
 
// test session schema
const testSessionSchema = new mongoose.Schema({
     quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Quiz',
          required: true,
     },

     tutorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },

     participants: [participantSchema],

     joinCode: {
          type: String,
     },

     isActive: {
          type: Boolean,
          default: true,
     },

     startedAt: {
          type: Date,
          default: Date.now,
     },

     endedAt: Date,
});

const testSessionModel = mongoose.model("TestSession", testSessionSchema);

export default testSessionModel;