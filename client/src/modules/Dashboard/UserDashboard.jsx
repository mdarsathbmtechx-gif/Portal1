import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaClipboardList, FaBookmark, FaSignOutAlt } from "react-icons/fa";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("applications");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || { name: "Guest User", email: "guest@email.com" });
  const [applications, setApplications] = useState(JSON.parse(localStorage.getItem("applications")) || []);
  const [savedJobs, setSavedJobs] = useState(JSON.parse(localStorage.getItem("savedJobs")) || []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) navigate("/login-dashboard");
    else setUser(JSON.parse(userData));
  }, [navigate]);
useEffect(() => {
  const updateProfile = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);
  };

  // Listen to profile updates
  window.addEventListener("profileUpdated", updateProfile);

  return () => window.removeEventListener("profileUpdated", updateProfile);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login-dashboard");
  };

  const avatarLetter = user?.name ? user.name[0].toUpperCase() : "G";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white shadow-md flex justify-between items-center px-6 py-3 sticky top-0 z-20">
        <h1 className="text-xl font-bold text-green-600">Job Portal</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-2 transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      <div className="flex max-w-7xl mx-auto mt-6 gap-6 px-4">
        {/* LEFT SIDEBAR */}
        <aside className="hidden md:flex flex-col w-72 bg-white rounded-xl shadow-lg p-6 sticky top-20 h-fit">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">{avatarLetter}</div>
            <h2 className="mt-3 font-semibold text-gray-800 text-lg">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <button
              onClick={() => navigate("/profile")}
              className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-md"
            >
              View Full Profile
            </button>
          </div>

          <hr className="my-4" />
          <div className="space-y-2 text-sm">
            <p className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Applications</span>
              <span className="font-semibold text-white bg-green-600 rounded-full px-2 py-1 text-xs shadow">{applications.length}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Saved Jobs</span>
              <span className="font-semibold text-white bg-green-600 rounded-full px-2 py-1 text-xs shadow">{savedJobs.length}</span>
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md p-4 flex gap-4 text-sm font-medium">
            {[
              { name: "Applications", tab: "applications" },
              { name: "Saved Jobs", tab: "saved" },
              { name: "Profile", tab: "profile" },
            ].map(item => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === item.tab ? "bg-green-600 text-white shadow-lg" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">My Applications</h2>
              <div className="space-y-3">
                {applications.map((app, idx) => (
                  <div key={idx} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{app.title}</h3>
                      <p className="text-sm text-gray-500">{app.company} - {app.location}</p>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                      app.status === "accepted" ? "bg-green-100 text-green-700" : app.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                    }`}>{app.status.replace("_", " ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Jobs Tab */}
          {activeTab === "saved" && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">Saved Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedJobs.map((job, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.company} - {job.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">Profile Overview</h2>
              <p className="text-gray-600 mb-2">Name: {user.name}</p>
              <p className="text-gray-600 mb-2">Email: {user.email}</p>
              <Button onClick={() => navigate("/profile")} type="primary">Go to Full Profile</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
