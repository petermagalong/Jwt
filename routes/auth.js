const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = new User({ username, password });
    const data = await user.save();
    res.status(201).json({ data, message: "New user registered successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;