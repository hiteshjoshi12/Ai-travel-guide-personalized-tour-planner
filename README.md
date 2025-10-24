AI Travel Itinerary Builder ✈️

A smart, MERN-stack travel planner that generates personalized, day-by-day itineraries using the Google Gemini AI. This application allows users to input detailed travel preferences, receive a custom-built plan, save their trips, and get real-time weather data for their destination.

✨ Core Features
🤖 AI-Powered Itineraries: Generates detailed, day-by-day travel plans using the Google Gemini API based on user inputs like destination, dates, budget, interests, and travel style.

⚡ Real-time Streaming: The AI's response is streamed to the UI in real-time, including a "chain of thought" to show the user its planning process.

🔐 User Authentication: Secure user registration and login using JSON Web Tokens (JWT).

📚 Trip History: Automatically saves generated itineraries for logged-in users, who can view and reload their past trips from a dedicated history panel.

🌦️ Real-time Weather: Integrates with the OpenWeatherMap API to display the current weather for the user's chosen destination right on the itinerary page.

💡 Suggested Trips: A dedicated section that fetches and displays curated trip suggestions from the database to inspire users.

🎨 Modern, Responsive UI: Built with React, Tailwind CSS, and shadcn/ui for a clean, fast, and fully responsive user experience.

🛠️ Tech Stack

Frontend:

React

Tailwind CSS

shadcn/ui

Backend:

Node.js

Express.js

Database:

MongoDB (with Mongoose)

Authentication:

JSON Web Tokens (JWT)

bcrypt.js

External APIs:

Google Gemini API

OpenWeatherMap API

🚀 Getting Started

To get a local copy up and running, follow these simple steps.

Prerequisites

Node.js (v18 or later)

npm (or yarn)

A MongoDB account (local or cloud-hosted with Atlas)

API keys for Google Gemini and OpenWeatherMap

1. Clone the Repositorygit clone 
2. Backend SetupFirst, let's get the server running.# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file
touch .env
Now, open the .env file and add the environment variables listed in the section below.# Start the backend server
npm start
Your server should now be running, typically on http://localhost:5000.3. Frontend SetupIn a new terminal, set up the client.# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm run dev
Your React app should now be running, typically on http://localhost:5173. Open this URL in your browser to use the application.🔑 Environment VariablesTo run the backend, you must create a .env file in the /backend directory with the following variables:# Server Port
PORT=5000

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JSON Web Token
JWT_SECRET=your_super_secret_jwt_key

# Google Gemini API
GEMINI_KEY=your_gemini_api_key

# OpenWeatherMap API
OPENWEATHER_API_KEY=your_openweathermap_api_key
📂 Project StructureThe repository is structured as a monorepo with two main folders:/
├── backend/
│   ├── controllers/    # Handles request logic
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API route definitions
│   └── server.js       # Express server setup
│
└── frontend/
    ├── public/
    └── src/
        ├── assets/         # Static images and styles
        ├── components/     # Reusable React components
        ├── pages/          # Page-level components (Home, Itinerary, Auth)
        └── App.jsx         # Main app component with routing
📄 API EndpointsThe backend exposes the following RESTful API routes:AuthPOST /api/user/register: Register a new user.POST /api/user/login: Log in an existing user.ItineraryPOST /api/generate: Generate a new AI itinerary (streams response).HistoryGET /api/history: Get all saved itineraries for the logged-in user.POST /api/history: Save a new itinerary.OtherGET /api/weather: Fetches weather for a location (proxied through the backend).GET /api/suggested-trips: Fetches pre-defined trip suggestions from the DB.LicenseDistributed under the MIT License. See LICENSE for more information.