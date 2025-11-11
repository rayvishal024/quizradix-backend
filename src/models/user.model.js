import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
     name: {
          type: String,
          require: true
     },

     email: {
          type: String,
          required: [true, "email is required"],
          unique: true,
          lowercase: true,
     },

     password: {
          type: String,
          required: [true, "password is required"],
          minlength: [8, "password must be atleast 8 length"],
          select: false,
     },

     role: {
          type: String,
          enum: ["student", "tutor"],
          default: "student",
     }
});

 // methode for generate instance token
userSchema.methods.generateAuthToken = function () {
     return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
          expiresIn: '1d'
     })
}

// methode for compare password with hash password
userSchema.methods.comparePassword = async function (candidatePassword) {
     return await bcrypt.compare(candidatePassword, this.password)
}

// static methode for hashing password
userSchema.statics.hashPassword = async function (password) {
     const saltRounds = 10;
     return await bcrypt.hash(password, saltRounds);
}

const userModel = mongoose.model('User', userSchema);

export default userModel;