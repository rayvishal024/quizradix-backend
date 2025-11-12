import userModel from "../models/user.model.js";

// register user controller
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
          const newUser = new userModel({ name, email, password: hashedPassword, role });
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

// login user controller
export const loginUser = async (req, res) => {
     const { email, password } = req.body;

     try {
          // find user by email
          const user = await userModel.findOne({ email }).select('+password');
          if (!user) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid email or password",
               });
          }
          // compare password
          const isPasswordValid = await user.comparePassword(password);
          if (!isPasswordValid) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid email or password",
               });
          }
          // generate auth token
          const token = user.generateAuthToken();

          return res.status(200)
               .cookie('token', token,
                    {
                         httpOnly: true,
                         maxAge: 24 * 60 * 60 * 1000
                    })
               .json({
                    success: true,
                    message: "Login successful",
                    token,
                    user: {
                         id: user._id,
                         name: user.name,
                         email: user.email,
                         role: user.role,
                    }
               });
     }
     catch (error) {
          console.error("Error in loginUser:", error.message);
          return res.status(500).json({
               success: false,
               message: "Internal Server Error",
          });
     }
}