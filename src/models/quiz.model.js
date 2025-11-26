import mongoose from "mongoose";

// quiz schema
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
     metadata: {
          hasStarted: { type: Boolean, default: false },
          hasEnded: { type: Boolean, default: false },
          reminderSent: { type: Boolean, default: false }
     },

});

// index
quizSchema.index({ startTime: 1 });
quizSchema.index({ endTime: 1 });
quizSchema.index({ "metadata.hasStarted": 1 });


// quiz model
const quizModel = mongoose.model("Quiz", quizSchema);

export default quizModel;