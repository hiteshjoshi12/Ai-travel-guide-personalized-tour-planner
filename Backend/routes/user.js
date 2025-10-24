const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware"); 

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secretkey12345";


//Get Profile
router.get("/profile", protect, async (req, res) => {

  res.json(req.user);
});

//Update Profile
router.put("/update", protect, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    }).select("-password");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating profile" });
  }
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      age,
      gender,
      location,
      country,
      bio,
    } = req.body; 

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" }); 

    const hashedPassword = await bcrypt.hash(password, 12); 

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      age,
      gender,
      country,
      bio,
      location,
    });

    await user.save(); 

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "Account created successfully. Redirecting...",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed. Please try again." });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; 

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" }); // Validate password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" }); // Generate token

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    s.status(500).json({ error: "Login failed. Please try again." });
  }
});

module.exports = router;
