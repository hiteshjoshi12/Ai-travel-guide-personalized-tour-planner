const express = require("express");
const router = express.Router();
const {
  saveItinerary,
  getItineraryHistory,
} = require("../controllers/historyController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, saveItinerary).get(protect, getItineraryHistory);

module.exports = router;