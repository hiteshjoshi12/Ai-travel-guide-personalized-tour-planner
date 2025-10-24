const express = require("express");
const router = express.Router();
const SuggestedTrip = require("../models/SuggestedTrips");
router.get("/", async (req, res) => {
  try {
    const tripCategories = await SuggestedTrip.find();
    res.json(tripCategories);
  } catch (err) {
    console.error('Error fetching suggested trips:', err);
    res.status(500).json({ message: 'Server error while fetching data' });
  }
})

module.exports = router;