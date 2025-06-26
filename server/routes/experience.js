
const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const { verifyToken } = require("../middlewares/auth");

// Add Experience
router.post("/", verifyToken, async (req, res) => {
  try {
    const { company, role, location, date, description, rounds, questions, advice } = req.body;

    const newExperience = new Experience({
      company,
      role,
      location,
      date,
      description,
      rounds,
      questions,
      advice,
      createdBy: req.userId,
    });

    await newExperience.save();
    res.status(201).json({ message: "Experience added" });
  } catch (err) {
    console.error("Error adding experience:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (err) {
    console.error("Error fetching experiences:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get one experience by ID
router.get("/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });
    res.status(200).json(exp);
  } catch (err) {
    res.status(500).json({ message: "Error fetching experience" });
  }
});

//  Like or Unlike an experience
router.post("/:id/like", verifyToken, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    const userId = req.userId;

    if (experience.likes.includes(userId)) {
      // Unlike
      experience.likes = experience.likes.filter(id => id.toString() !== userId);
      await experience.save();
      return res.status(200).json({ message: "Unliked", likes: experience.likes.length });
    } else {
      // Like
      experience.likes.push(userId);
      await experience.save();
      return res.status(200).json({ message: "Liked", likes: experience.likes.length });
    }
  } catch (err) {
    console.error("Error liking experience:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//  Comment
router.post("/:id/comment", async (req, res) => {
  try {
    const { text, user } = req.body;
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });

    exp.comments.push({ user, text });
    await exp.save();

    res.status(200).json({ message: "Comment added" });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Server error" });
  }
  
});

module.exports = router;
