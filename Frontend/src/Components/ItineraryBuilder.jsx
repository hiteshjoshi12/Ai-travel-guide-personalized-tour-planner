import React, { useState, useRef, useEffect } from "react";
import WeatherWidget from "./WeatherWidget";
import ChainOfThoughtInline from "./ChainOfThoughtInline";
import HistoryPanel from "./HistoryPanel";
import RenderItinerary from "./RenderItinerary";

const ItineraryBuilder = () => {
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    interests: "",
    travelStyle: "Balanced",
    groupType: "Solo",
    pace: "Moderate",
    accommodation: "Hotel",
    foodPreference: "",
    transportation: "Public transport",
    specialRequirements: "",
    budget: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [itineraryText, setItineraryText] = useState("");
  const [chainSteps, setChainSteps] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedItinerary, setSelectedItinerary] = useState("");

  const [historyItems, setHistoryItems] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fetchHistory = async () => {
    if (!token) {
      setIsHistoryLoading(false);
      return;
    }
    setIsHistoryLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await res.json();
      setHistoryItems(data);
    } catch (error) {
      console.error(error);
      setHistoryItems([]);
    }
    setIsHistoryLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [token]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const buildPrompt = () =>
    `Generate a detailed day-wise travel itinerary for ${
      form.destination
    } from ${form.startDate} to ${
      form.endDate
    } for a ${form.groupType.toLowerCase()} with a ${form.travelStyle.toLowerCase()} travel style, preferring a ${form.pace.toLowerCase()} pace, staying in ${form.accommodation.toLowerCase()} accommodation, preferring ${
      form.foodPreference || "varied food"
    }, using ${form.transportation.toLowerCase()} for transportation, with special requirements: ${
      form.specialRequirements || "none"
    }, and a budget of ${
      form.budget || "unspecified"
    }. Include landmarks, food, activities, and travel tips.`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectedItinerary("");

    const prompt = buildPrompt();
    setIsGenerating(true);
    setItineraryText("");
    setChainSteps([]);
    setWeatherData(null);
    setError(null);

    let fullItineraryText = "";

    try {
      const res = await fetch(`${API_BASE_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to connect to the generation service.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.thought) {
                setChainSteps((prev) => [...prev, data.thought]);
              }
              if (data.answer) {
                setItineraryText((prev) => prev + data.answer);
                fullItineraryText += data.answer;
              }
              if (data.done) {
                setIsGenerating(false);
                setWeatherData({
                  location: form.destination,
                  date: form.startDate,
                });
              }
            } catch (e) {}
          }
        }
      }

      if (fullItineraryText.length > 0 && token) {
        // Calculate duration for a better title
        let durationStr = "Trip";
        try {
          const date1 = new Date(form.startDate);
          const date2 = new Date(form.endDate);
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          if (diffDays > 0 && !isNaN(diffDays)) {
            durationStr = `${diffDays} Day${diffDays > 1 ? "s" : ""}`;
          }
        } catch (dateError) {}

        const title = `${form.destination}, ${durationStr}`;

        try {
          await fetch(`${API_BASE_URL}/api/history`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: title,
              destination: form.destination,
              startDate: form.startDate,
              content: fullItineraryText,
            }),
          });

          fetchHistory();
        } catch (saveError) {
          console.error("Failed to save itinerary:", saveError);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate itinerary.");
      setItineraryText("");
      setIsGenerating(false);
    }
  };
  const displayText = itineraryText || selectedItinerary;

  return (
    <div className="min-h-screen flex justify-center p-6 bg-[#111313]">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <HistoryPanel
            onItinerarySelect={setSelectedItinerary}
            historyItems={historyItems}
            isLoading={isHistoryLoading}
          />

          <div className="lg:col-span-2 flex flex-col space-y-6">
            <div
              className="bg-[#0f1111] border border-gray-800 rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}
            >
              <div className="w-full">
                {error ? (
                  <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-xl mb-4 text-center font-medium flex items-center justify-center gap-2">
                    <strong>Error:</strong> {error}
                  </div>
                ) : (
                  <ChainOfThoughtInline steps={chainSteps} />
                )}
                <div className="bg-[#0b0d0d] rounded-2xl p-6 max-h-[70vh] overflow-y-auto border border-gray-700 shadow-2xl transition duration-500 hover:shadow-cyan-900/50 custom-scrollbar">
                  <h3 className="text-2xl font-extrabold text-blue-400 	mb-4 border-b border-gray-700 pb-2 flex items-center gap-2">
                    <span className="text-yellow-400">AI Travel Assistant</span>{" "}
                    Itinerary
                  </h3>

                  {!displayText && !isGenerating ? (
                    <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-8">
                      <p className="text-gray-500 italic font-medium">
                        Ready for adventure? Fill out the form below to
                        instantly generate your custom travel plan.
                      </p>
                    </div>
                  ) : (
                    <RenderItinerary itineraryText={displayText} />
                  )}

                  {/* Weather Widget */}
                  {weatherData && !selectedItinerary && (
                    <div className="mt-6 border-t border-gray-800 pt-4">
                      <WeatherWidget
                        location={weatherData.location}
                        date={weatherData.date}
                        weather={null}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full bg-transparent p-4 border border-gray-800 rounded-xl"
            >
              <h3 className="text-xl font-bold text-gray-200 mb-6">
                Plan Your Trip
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-full space-y-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="destination"
                      className="text-sm font-medium text-gray-400 mb-1"
                    >
                      Destination
                    </label>
                    <input
                      id="destination"
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      placeholder="City or Location (e.g.,India, Paris, Tokyo)"
                      className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label
                        htmlFor="startDate"
                        className="text-sm font-medium text-gray-400 mb-1"
                      >
                        Start Date
                      </label>
                      <input
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 focus:ring-blue-500 focus:border-blue-500 date-picker-icon"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="endDate"
                        className="text-sm font-medium text-gray-400 mb-1"
                      >
                        End Date
                      </label>
                      <input
                        id="endDate"
                        type="date"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 focus:ring-blue-500 focus:border-blue-500 date-picker-icon"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full space-y-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="interests"
                      className="text-sm font-medium text-gray-400 mb-1"
                    >
                      Interests
                    </label>
                    <input
                      id="interests"
                      name="interests"
                      value={form.interests}
                      onChange={handleChange}
                      placeholder="Culture, Food, Hiking (comma separated)"
                      className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="travelStyle"
                    className="text-sm font-medium text-gray-400 mb-1"
                  >
                    Travel Style
                  </label>
                  <select
                    id="travelStyle"
                    name="travelStyle"
                    value={form.travelStyle}
                    onChange={handleChange}
                    className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[
                      "Relaxed",
                      "Balanced",
                      "Adventure",
                      "Luxury",
                      "Budget",
                    ].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="groupType"
                    className="text-sm font-medium text-gray-400 mb-1"
                  >
                    Group Type
                  </label>
                  <select
                    id="groupType"
                    name="groupType"
                    value={form.groupType}
                    onChange={handleChange}
                    className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {["Solo", "Couple", "Family", "Friends"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="pace"
                    className="text-sm font-medium text-gray-400 mb-1"
                  >
                    Pace
                  </label>
                  <select
                    id="pace"
                    name="pace"
                    value={form.pace}
                    onChange={handleChange}
                    className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {["Slow", "Moderate", "Fast"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="accommodation"
                    className="text-sm font-medium text-gray-400 mb-1"
                  >
                    Accommodation
                  </label>
                  <select
                    id="accommodation"
                    name="accommodation"
                    value={form.accommodation}
                    onChange={handleChange}
                    className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {["Hotel", "Hostel", "Airbnb", "Guesthouse"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="foodPreference"
                    className="text-sm font-medium text-gray-400 mb-1"
                  >
                    Food Preference
                  </label>
                  <input
                    id="foodPreference"
                    name="foodPreference"
                    value={form.foodPreference}
                    onChange={handleChange}
                    placeholder="E.g., Vegetarian, Local Cuisine"
                    className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="transportation"
                    className="text-sm font-medium text-gray-400 mb-1"
                  >
                    Transportation
                  </label>
                  <select
                    id="transportation"
                    name="transportation"
                    value={form.transportation}
                    onChange={handleChange}
                    className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {["Public transport", "Taxi", "Rental car", "Bicycle"].map(
                      (o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="budget"
                    className="text-sm font-medium text-gray-400 mb-1"
                  >
                    Budget
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="E.g., ₹1000 total or ₹200/day"
                    className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="specialRequirements"
                    className="text-sm font-medium text-gray-400 mb-1"
                  >
                    Special Requirements
                  </label>
                  <input
                    id="specialRequirements"
                    name="specialRequirements"
                    value={form.specialRequirements}
                    onChange={handleChange}
                    placeholder="Accessibility, Allergies, etc."
                    className="w-full p-3 rounded border border-gray-700 bg-[#0b0d0d] text-gray-100 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="col-span-full py-3 rounded mt-4 font-semibold transition duration-200 hover:opacity-90"
                  style={{ background: "#2563EB", color: "#F6F1DE" }}
                >
                  {isGenerating
                    ? "Generating Itinerary..."
                    : "Generate Itinerary"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;

