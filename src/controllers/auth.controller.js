import userModel from "../models/user.model.js";

export const registerUser = async (req, res) => {
     const { name, email, password, role } = req.body;

     // check user existence
     try {
          const existingUser = await userModel.findOne({ email });
          if (existingUser) {
               return res.status(400).json({
                    success: false,
                    message: "User already exists with this email",
               });
          }

          // hash password         
          const hashedPassword = await userModel.hashPassword(password);

          // create new user
          const newUser = new userModel({ name, email, password : hashedPassword, role });
          await newUser.save();

          return res.status(201).json({
               success: true, 
               message: "User registered successfully",
          });
     } catch (error) {
          console.error("Error in registerUser:", error.message);
          return res.status(500).json({
               success: false,
               message: "Internal Server Error",
          });
     }
}