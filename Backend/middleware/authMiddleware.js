const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
const JWT_SECRET = process.env.JWT_SECRET; 

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find the user by ID from the token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }
    
    // Attach the full user object (minus password) to req.user
    req.user = user; 
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { protect };