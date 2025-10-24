const Itinerary = require("../models/Itinerary");

exports.saveItinerary = async (req, res) => {
  try {
    const { title, destination, startDate, content } = req.body;
    if (!title || !destination || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const itinerary = new Itinerary({
      user: req.user.id, 
      title,
      destination,
      startDate,
      content,
    });

    const savedItinerary = await itinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getItineraryHistory = async (req, res) => {
  try {
    const history = await Itinerary.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};