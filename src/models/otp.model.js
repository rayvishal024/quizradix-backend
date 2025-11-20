import mongoose from "mongoose";
import { sendMail } from "../utils/mailSender.js";

// otp schema
const otpSchema = new mongoose.Schema({
     email: {
          type: String,
          required: true,     
     }
     ,
     otp: {
          type: String,  
          required: true,
     },
     createdAt: {   
          type: Date,
          default: Date.now,
          expires: 300, // OTP expires after 5 minutes
     },
})


// methode to send OTP to user's email
const sendOtpToEmail = async function (email, otp) {
    try {
         const mailresponse =  await sendMail(
           email,
           "Verification Email",
           `<h3>Please Confirm Your Otp</h3>
           <p>Your OTP code is ${otp}. It is valid for 5 minutes.</p>`
           
         );
        // console.log("Email send to user Successsfully ", mailresponse);
    } catch (error) {
         console.error("Error sending OTP email:", error.message);
    }
}

// send otp just before saving to database
otpSchema.pre("save", async function (next) {
     if (this.isNew) {
         await sendOtpToEmail(this.email, this.otp)
     }
     next();
} )

const otpModel = mongoose.model("Otp", otpSchema);

export default otpModel;