import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", form);

  
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful!");

        // Notify other components (header) about login
      window.dispatchEvent(new Event("storage"));

      onLogin && onLogin(res.data.token);

     
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.error || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-indigo-100 to-blue-50">
      {/* Left Frame */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-center"
        >
          <img
            src="https://illustrations.popsy.co/amber/app-launch.svg"
            alt="Login Illustration"
            className="w-80 mx-auto mb-6"
          />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome Back 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Log in to access your dashboard, manage your profile, and explore
            more features.
          </p>
        </motion.div>
      </div>

      {/* Right Frame (Login Form) */}
      <div className="flex-1 flex items-center text-gray-900 justify-center bg-white shadow-lg rounded-l-3xl lg:rounded-none">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-10"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
            Sign In to Your Account
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mb-6 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md shadow-md"
          >
            Log In
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
            New here?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Create an account
            </Link>
            .
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
