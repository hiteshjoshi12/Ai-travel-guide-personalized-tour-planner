import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Camera, Edit3, Save } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setPreviewImage(res.data.profileImage);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setUser({ ...user, profileImage: imageUrl });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/user/update", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen text-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden"
      >
        {/* LEFT COLUMN */}
        <div className="lg:w-1/3 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
          <div className="relative">
            <img
              src={previewImage}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
            />
            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200 transition">
                <Camera className="text-blue-600 w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <h2 className="mt-4 text-2xl font-semibold">{user.fullName}</h2>
          <p className="text-blue-100">{user.email}</p>

          <button
            onClick={() =>
              isEditing ? handleSave() : setIsEditing(true)
            }
            className="mt-6 bg-white text-blue-700 px-5 py-2 rounded-md flex items-center gap-2 font-semibold shadow-md hover:bg-gray-100 transition"
          >
            {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 p-8 lg:p-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              ["Full Name", "fullName"],
              ["Phone", "phone"],
              ["Age", "age"],
              ["Gender", "gender"],
              ["Country", "country"],
              ["Location", "location"],
            ].map(([label, field]) => (
              <div key={field}>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                {isEditing ? (
                  <input
                    type="text"
                    name={field}
                    value={user[field] || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="font-medium text-gray-800">
                    {user[field] || "-"}
                  </p>
                )}
              </div>
            ))}

            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Bio</p>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={user.bio || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ) : (
                <p className="font-medium text-gray-800">{user.bio || "-"}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
