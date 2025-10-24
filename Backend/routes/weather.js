const express = require("express");
const router = express.Router();
const axios = require("axios");
const OPENWEATHER_API_key = process.env.OPENWEATHER_API_KEY || "0a3b078f6efe79aa18007945acf9a204"; 

router.get("/", async (req, res) => {
  
  try {

    const { lat, lon } = req.query; 
    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

  
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: lat,       
          lon: lon,       
          appid: OPENWEATHER_API_key,
          units: "metric", 
        },
      }
    );

    const weatherData = weatherResponse.data;
   

    // Formated weather data 
    const weather = {
      temp: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      city: weatherData.name,
      country: weatherData.sys.country,
    };


    // Send the formatted data back to the frontend
    res.json({ weather });
    
  } catch (err) {
    console.error("Weather API error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ 
      error: "Failed to fetch weather data",
      message: err.response?.data?.message || err.message,
      weather: null 
    });
  }
});

module.exports = router;

