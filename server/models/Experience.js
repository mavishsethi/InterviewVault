
const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    rounds: [
      {
        roundName: { type: String },
        description: { type: String }
      }
    ],
    questions: [
      {
        questionText: { type: String },
        type: { type: String },
        difficulty: { type: String }
      }
    ],
    advice: { type: String },
    tags: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    
likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //  New: Comments - store user name & comment text
    comments: [
      {
        user: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
