const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please fill your name"],
    },
    email: {
      type: String,
      required: [true, "Please fill your email"],
      unique: true,
      lowercase: true,
     
    },
    address: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please fill your password"],
      minLength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please fill your password confirm"],
      validate: {
        validator: function(el) {
          // "this" works only on create and save
          return el === this.password;
        },
        message: "Your password and confirmation password are not the same",
      },
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  });



  
const User = mongoose.model("User", userSchema);
module.exports = User;