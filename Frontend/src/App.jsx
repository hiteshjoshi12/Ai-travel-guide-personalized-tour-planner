import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import ItineraryBuilder from './Components/ItineraryBuilder';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Suggested from './Components/Suggested';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#111313] text-gray-100 flex flex-col">
        <Header />
        <main className="flex-1 mt-16 w-full">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/itinerary"
              element={
                <ProtectedRoute>
                  <ItineraryBuilder />
                </ProtectedRoute>
              }
            />

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/suggested'
              element={
                <ProtectedRoute>
                  <Suggested />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;