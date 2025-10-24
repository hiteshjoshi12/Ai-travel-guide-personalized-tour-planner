const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    content: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Itinerary", ItinerarySchema);