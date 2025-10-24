import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherWidget = ({ location }) => {
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");


  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const date = new Date().toLocaleDateString();
  useEffect(() => {
    if (!location) {
      return; 
    }

    const fetchGeoData = async () => {
      setIsLoading(true);
      setError(null);
      setWeather(null);
      setLat("");
      setLon("");
      
      const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=0a3b078f6efe79aa18007945acf9a204`;
      
      try {
        const geodataResponse = await axios.get(geocodingUrl);
        const data = geodataResponse.data;

        if (data && data.length > 0) {
          setLon(data[0].lon);
          setLat(data[0].lat);
        } else {
          throw new Error(`Could not find location data for "${location}".`);
        }
      } catch (err) {
        console.error("Geocoding API error:", err);
        setError(err.message);
        setIsLoading(false); 
      }
    };

    fetchGeoData();
  }, [location]); 
  useEffect(() => {
    if (!lat || !lon) {
      return; 
    }

    const fetchWeather = async () => {
  
      try {
        const response = await axios.get(`${API_BASE_URL}/api/weather`, {
          params: { lat, lon }, 
        });

        setWeather(response.data.weather);
      } catch (error) {
        console.error("Failed to fetch weather from server:", error);
        setError("Could not fetch weather data.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (isLoading) {
    return (
      <div className="p-4 rounded-lg shadow-lg" style={{ background: 'linear-gradient(135deg, #F6F1DE 0%, #ACD3A8 100%)' }}>
        <p className="font-medium text-gray-800">
          Loading weather for {location}...
        </p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 rounded-lg shadow-lg bg-red-100 border border-red-400 text-red-700">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
       <div className="p-4 rounded-lg shadow-lg" style={{ background: 'linear-gradient(135deg, #F6F1DE 0%, #ACD3A8 100%)' }}>
        <p className="font-medium text-gray-800">
          Please provide a location to see the weather.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg shadow-lg" style={{ background: 'linear-gradient(135deg, #F6F1DE 0%, #ACD3A8 100%)' }}>
      <p className="font-medium mb-2 text-gray-800">Weather for {weather.city}, {weather.country} on {date}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-semibold text-gray-900 tracking-wide">{Math.round(weather.temp)}°C</p>
          <p className="text-sm text-gray-700 capitalize">{weather.description}</p>
        </div>
        {weather.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-16 h-16"
          />
        )}
      </div>
      <div className="mt-3 text-sm text-gray-700 space-y-1">
        <p>Feels like: {Math.round(weather.feels_like)}°C</p>
        <p>Humidity: {weather.humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
