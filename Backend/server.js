require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const geminiRoutes = require('./routes/gemini');
const weatherRoute = require("./routes/weather");
const suggestedTripsRoute = require("./routes/Suggestedtrips");
const historyRoutes = require('./routes/historyRoutes');

const app = express();
const port = process.env.PORT; 

const mongoURI = process.env.MONGODB_URI; 

app.use(cors());
app.use(express.json());


mongoose.connect(mongoURI); 
console.log('Connected to MongoDB');

// Auth routes
app.use('/api/user', userRoutes);
app.use("/api/generate",geminiRoutes);
app.use("/api/weather", weatherRoute);
app.use("/api/suggested-trips",suggestedTripsRoute);
app.use('/api/history', historyRoutes);


app.listen(port, () => console.log(`Server running on port ${port}`));