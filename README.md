# AI Travel Itinerary Builder ✈️

A smart, MERN-stack travel planner that generates personalized, day-by-day itineraries using the Google Gemini AI. This application allows users to input detailed travel preferences, receive a custom-built plan, save their trips, and get real-time weather data for their destination.


## ✨ Core Features

- **AI-Powered Itineraries:** Generates detailed, day-by-day travel plans using the Google Gemini API based on user inputs like destination, dates, budget, interests, and travel style.

- **Real-time Streaming:** The AI's response is streamed to the UI in real-time, including a "chain of thought" to show the user its planning process.

- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).

- **Trip History:** Automatically saves generated itineraries for logged-in users, who can view and reload their past trips from a dedicated history panel.

- **Real-time Weather:** Integrates with the OpenWeatherMap API to display the current weather for the user's chosen destination right on the itinerary page.

- **Suggested Trips:** A dedicated section that fetches and displays curated trip suggestions from the database to inspire users.

- **Modern, Responsive UI:** Built with React, Tailwind CSS, and shadcn/ui for a clean, fast, and fully responsive user experience.


## Tech Stack

**Frontend:** 
- React
- Tailwind CSS
- shadcn/ui

**Backend:** 
- Node
- Express

**Database:**
- MongoDB (with Mongoose)
**Authentication:**
- JSON Web Tokens (JWT)
- bcrypt.js

**External APIs:**
- Google Gemini API
- OpenWeatherMap API


## Run Locally

Clone the Repository

```bash
  git clone https://github.com/hiteshjoshi12/Ai-travel-guide-personalized-tour-planner
```

Backend Setup

```bash
cd backend
npm install
touch .env
```
Now, open the .env file and add the environment variables listed in the section below.
 
 ```bash 
 # Start the backend server
npm start
```

Frontend Setup

In a new terminal, set up the client.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm run dev
```

Your React app should now be running, typically on http://localhost:5173. Open this URL in your browser to use the application.

 Environment Variables

 To run the backend, you must create a .env file in the /backend directory with the following variables:
```bash
# Server Port
PORT=5000

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JSON Web Token
JWT_SECRET=your_super_secret_jwt_key

# Google Gemini API
GEMINI_KEY=your_gemini_api_key

# OpenWeatherMap API
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

