import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import axios from "axios";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setPreviewImage("");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setPreviewImage(res.data.profileImage);
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response && err.response.status === 401) {
          handleLogout(true); 
        }
      }
    };
    fetchProfile();
  }, [loggedIn]);


  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = (isTokenInvalid = false) => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    if (!isTokenInvalid) {
      navigate("/login");
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-bold transition"
      : "text-gray-300 hover:text-white transition";

  const mobileNavLinkStyle = ({ isActive }) =>
    isActive
      ? "block px-3 py-2 rounded-md text-base font-medium text-yellow-400 bg-gray-700"
      : "block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700";

  return (
    <header className="bg-[#111313] text-white shadow-lg fixed top-0 w-full z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: Logo & Desktop Nav */}
          <div className="flex items-center space-x-10">
            <Link to={"/"} onClick={closeMobileMenu}>
              <div className="text-2xl font-bold text-yellow-400 flex items-center">
                <span className="text-3xl mr-1"><img className="w-12" src={logo} alt="TravelAI Logo" /></span>TravelAI
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" className={navLinkStyle}>Home</NavLink>
              <NavLink to="/itinerary" className={navLinkStyle}>Itinerary Builder</NavLink>
              <NavLink to="/suggested" className={navLinkStyle}>Suggested Trips</NavLink>
            </nav>
          </div>

          {/* Right Side: Auth & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            
            {/* Desktop Auth: Profile Dropdown or Sign In Button */}
            <div ref={profileMenuRef} className="relative hidden md:block">
              {loggedIn ? (
                <>
                  {/* Avatar (Clickable) */}
                  <img
                    src={previewImage || "https://i.pravatar.cc/40"}
                    alt="user-avatar"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-400 transition hover:border-yellow-500"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  />
                  
                  {/* Desktop Dropdown (Click-controlled) */}
                  <div 
                    className={`
                      absolute right-0 mt-2 w-56 bg-gray-800 shadow-xl rounded-md z-50 border border-gray-700
                      transition-all duration-200 overflow-hidden
                      ${isProfileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                    `}
                  >
                    {/* User Info Block */}
                    <div className="flex items-center p-3 border-b border-gray-700">
                      <img
                        src={previewImage || "https://i.pravatar.cc/40"}
                        alt="user-avatar"
                        className="w-10 h-10 rounded-full border border-yellow-400"
                      />
                      <div className="ml-3 overflow-hidden">
                        <div className="text-sm font-medium text-white truncate">
                          {user?.fullName || "User"}
                        </div>
                        <div className="text-xs font-medium text-gray-400 truncate">
                          {user?.email || ""}
                        </div>
                      </div>
                    </div>
                    {/* Links Block */}
                    <nav className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/70"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={() => handleLogout()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/70"
                      >
                        Sign Out
                      </button>
                    </nav>
                  </div>
                </>
              ) : (
                // Desktop "Sign In" Button
                <Link
                  to="/login"
                  className="font-bold px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 shadow-md hover:bg-yellow-500 transition duration-300"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Hamburger Button (Mobile Only) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Panel --- */}
      <div 
        className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-[#111313] border-t border-gray-700`} 
        id="mobile-menu"
      >
        {/* Mobile Nav Links */}
        <nav className="flex flex-col space-y-1 px-2 pt-2 pb-3">
          <NavLink to="/" onClick={closeMobileMenu} className={mobileNavLinkStyle}>Home</NavLink>
          <NavLink to="/itinerary" onClick={closeMobileMenu} className={mobileNavLinkStyle}>Itinerary Builder</NavLink>
          <NavLink to="/suggested" onClick={closeMobileMenu} className={mobileNavLinkStyle}>Suggested Trips</NavLink>
        </nav>

        {/* Mobile Auth Section */}
        {loggedIn ? (
        
          <div className="border-t border-gray-700 pt-3 pb-3">
            <div className="flex items-center px-4 mb-3">
              <img
                src={previewImage || "https://i.pravatar.cc/40"}
                alt="user-avatar"
                className="w-10 h-10 rounded-full border border-yellow-400"
              />
              <div className="ml-3 overflow-hidden">
                <div className="text-base font-medium text-white truncate">
                  {user?.fullName || "User"}
                </div>
                <div className="text-sm font-medium text-gray-400 truncate">
                  {user?.email || ""}
                </div>
              </div>
            </div>
            <nav className="flex flex-col space-y-1 px-2">
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Your Profile
              </Link>
              <button
                onClick={() => handleLogout()}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Sign Out
              </button>
            </nav>
          </div>
        ) : (
          <div className="border-t border-gray-700 px-2 pt-3 pb-3">
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="block w-full text-center px-3 py-2 rounded-md text-base font-bold bg-yellow-400 text-gray-900 hover:bg-yellow-500"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;