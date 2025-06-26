

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String }, // optional if using only Google OAuth
  avatar: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
