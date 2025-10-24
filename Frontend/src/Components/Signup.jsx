import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/user/signup`,
        form
      );
      setMsg(res.data.message);
      localStorage.setItem("token", res.data.token);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.error || "Signup failed"));
    }
  };
  window.dispatchEvent(new Event("storage"));
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-indigo-100">
      {/* Left Frame */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-center"
        >
          <img
            src="https://illustrations.popsy.co/amber/man-riding-a-rocket.svg"
            alt="Signup Illustration"
            className="w-80 mx-auto mb-6"
          />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Join Our Community 🚀
          </h1>
          <p className="text-gray-600 text-lg">
            Sign up to get started with personalized experiences and a beautiful
            dashboard.
          </p>
        </motion.div>
      </div>

      {/* Right Frame (Signup Form) */}
      <div className="flex-1 flex items-center text-gray-900 justify-center bg-white shadow-lg rounded-l-3xl lg:rounded-none">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-10"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
            Create Your Account
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            

            <textarea
              name="bio"
              placeholder="Short Bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="sm:col-span-2 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="sm:col-span-2 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md shadow-md"
          >
            Sign Up
          </button>

          {msg && (
            <p
              className={`mt-4 text-center ${
                msg.startsWith("Error") ? "text-red-600" : "text-green-600"
              }`}
            >
              {msg}
            </p>
          )}

          <div className="my-6 border-t border-gray-200"></div>

          <p className="text-center text-gray-700 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Log in here
            </Link>
            .
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
