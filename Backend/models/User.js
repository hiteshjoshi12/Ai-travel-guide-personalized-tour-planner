const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // Hashed password
    },
    phone: {
      type: String,
      trim: true,
    },
    location: { 
      type: String, 
      trim: true 
    },
    age: {
      type: Number,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    country: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    profileImage: {
      type: String, // URL to profile picture
      default: "https://i.pravatar.cc/40", // default avatar
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
