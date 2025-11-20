import otpModel from "../models/otp.model.js";
import userModel from "../models/user.model.js";
import otpgenerator from "otp-generator";

// send otp
export const sendOTP = async (req, res) => {
     try {
          const { email } = req.body;

          // check user existence
          const isUserExist = await userModel.findOne({ email });
         
          if (isUserExist) {
               return res.status(400).json({
                    success: false,
                    message: "User already exists with this email",
               });
          }

          // generate OTP
          const otp = otpgenerator.generate(6, {
               digits: true,
               lowerCaseAlphabets: false,
               upperCaseAlphabets: false,
               specialChars: false,
          });

          // save otp to database
          const newOtp = new otpModel({ email, otp });
          await newOtp.save();

          return res.status(200).json({
               success: true,
               message: "OTP sent to your email",
          });
     } catch (error) {
          console.error("Error in sendOTP:", error.message);
          return res.status(500).json({
               success: false,
               message: "Internal Server Error",
          });
     }
}

// verify otp
export const verifyOTP = async (req, res) => {
     try {
          const { email, otp } = req.body;

          // find otp in database
          const validOtp = await otpModel.findOne({ email, otp });
         
          if (!validOtp) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid OTP or OTP has expired",
               });
          }
           
          // sendingg success response
          return res.status(200).json({
               success: true,
               message: "OTP verified successfully",
          });
     } catch (error) {

          console.error("Error in sendOTP:", error.message);

          return res.status(500).json({
               success: false,
               message: "Internal Server Error",
          });
     }
}