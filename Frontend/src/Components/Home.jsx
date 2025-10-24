import React from "react";
import { Link } from "react-router-dom";
import heroBg from "../assets/image.png";

const featuredTrips = [
  {
    id: 1,
    destination: "Paris, France",
    highlights: "Eiffel Tower, Louvre Museum, Seine River",
    bestTime: "April - June",
    image:
      "https://img.static-af.com/transform/45cb9a13-b167-4842-8ea8-05d0cc7a4d04/",
  },
  {
    id: 2,
    destination: "Kyoto, Japan",
    highlights: "Temples, Cherry Blossoms, Traditional Tea Houses",
    bestTime: "March - May",
    image:
      "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
  },
  {
    id: 3,
    destination: "New York, USA",
    highlights: "Statue of Liberty, Central Park, Broadway",
    bestTime: "September - November",
    image:
      "https://blog.onevasco.com/wp-content/uploads/Reasons-to-Visit-USA.png",
  },
];
const Home = () => {
  return (
    <div className="bg-[#111313] min-h-screen text-gray-100">
      {/* Full-width Hero Section */}
      <section
        className="w-full relative min-h-[600px] flex items-center bg-cover bg-center mb-16 overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-20 px-8">
          <div className="flex-1 text-center lg:pr-0 pt-10 lg:pt-0 text-white max-w-3xl">
            <h1 className="text-4xl sm:text-4xl font-extrabold mb-6 leading-tight drop-shadow-xl">
              {" "}
              {/* Increased size for impact */}
              Every Journey, One of a Kind
              <span className="block text-yellow-400 mt-3">
                Crafted with AI + Expert Care.
              </span>
            </h1>
            <p className="text-xl mb-10 max-w-xl mx-auto drop-shadow-md text-gray-300">
              No generic plans. Just AI + Experts crafting journeys around your
              vibe, budget, & dates. Stop planning, start traveling!
            </p>
            <Link
              to="/itinerary"
              className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.05]"
            >
              Plan Itinerary For Free!
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HOW IT WORKS Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-gray-100 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0f1111] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 border border-yellow-800/50">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                1. Share Preferences
              </h3>
              <p className="text-gray-400">
                Input your destination, dates, interests, and style to begin
                planning.
              </p>
            </div>

            <div className="bg-[#0f1111] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 border border-blue-800/50">
              <h3 className="text-xl font-semibold mb-2 text-[#95c5ff]">
                2. AI Curates Plan
              </h3>
              <p className="text-gray-400">
                Our AI engine instantly generates a customized, day-wise
                itinerary.
              </p>
            </div>

            <div className="bg-[#0f1111] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 border border-green-800/50">
              <h3 className="text-xl font-semibold mb-2 text-[#ACD3A8]">
                3. Check Weather
              </h3>
              <p className="text-gray-400">
                View integrated weather data to help you pack and plan
                activities.
              </p>
            </div>

            <div className="bg-[#0f1111] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 border border-pink-800/50">
              <h3 className="text-xl font-semibold mb-2 text-pink-400">
                4. Enjoy & Explore
              </h3>
              <p className="text-gray-400">
                Get your detailed itinerary and start your personalized
                adventure!
              </p>
            </div>
          </div>
        </section>

        {/* Featured Suggested Trips */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-gray-100 text-center">
            Inspiring Destinations ✨
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-[#0f1111] rounded-xl shadow-lg overflow-hidden hover:shadow-yellow-400/30 transition cursor-pointer border border-gray-700"
              >
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-yellow-400">
                    {trip.destination}
                  </h3>
                  <p className="text-gray-400 my-3">{trip.highlights}</p>
                  <p className="text-sm font-semibold text-[#95c5ff]">
                    Best time to visit: {trip.bestTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits and Features */}
        <section className="mb-16 max-w-4xl mx-auto text-center text-gray-100">
          <h2 className="text-3xl font-bold mb-10">Why Choose TravelAI?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#0f1111] p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="font-bold text-xl mb-2 text-yellow-400">
                Personalized Plans
              </h3>
              <p className="text-gray-400">
                Tailored itineraries based on your unique preferences and
                interests, not generic guides.
              </p>
            </div>

            <div className="bg-[#0f1111] p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="font-bold text-xl mb-2 text-yellow-400">
                Real-time Updates
              </h3>
              <p className="text-gray-400">
                Adjust your plan on the go with AI-powered dynamic suggestions
                and recommendations.
              </p>
            </div>

            <div className="bg-[#0f1111] p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="font-bold text-xl mb-2 text-yellow-400">
                Integrated Weather
              </h3>
              <p className="text-gray-400">
                Stay prepared with daily weather info integrated right into
                your travel plans.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

