// backend/models/SuggestedTrips.js
const mongoose = require('mongoose');

const TripSubSchema = new mongoose.Schema({
  id: { type: Number, required: true },                 
  destination: { type: String, required: true },
  image: { type: String },
  highlights: { type: [String], default: [] },
  bestTimeToVisit: { type: String }
}, { _id: false }); // use the provided numeric id rather than creating another _id for each subdoc

const SuggestedTripsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  trips: { type: [TripSubSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('SuggestedTrips', SuggestedTripsSchema);
