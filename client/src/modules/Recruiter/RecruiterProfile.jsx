// src/modules/Recruiter/RecruiterProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaSave, FaBriefcase, FaUsers, FaChartBar } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function RecruiterProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [recruiter, setRecruiter] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    additionalInfo: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("recruiter");
    if (!stored) navigate("/recruiter-home");
    else {
      const data = JSON.parse(stored);
      setRecruiter(data);
      setForm({
        name: data.name || "",
        email: data.email || "",
        company: data.company || "",
        additionalInfo: data.additionalInfo || "",
      });
    }
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    const updated = { ...recruiter, ...form };
    localStorage.setItem("recruiter", JSON.stringify(updated));
    setRecruiter(updated);
    setEditMode(false);
  };

  // Dummy data
  const jobsPosted = [
    { title: "Software Engineer", applicants: 10 },
    { title: "UI/UX Designer", applicants: 6 },
  ];

  const applicants = [
    { name: "John Doe", position: "Frontend Dev", status: "Approved" },
    { name: "Jane Smith", position: "UI Designer", status: "Rejected" },
  ];

  const pieData = [
    { name: "Approved", value: 8 },
    { name: "Rejected", value: 4 },
  ];
  const COLORS = ["#22c55e", "#ef4444"];

  const initial = recruiter?.name?.charAt(0) || "R";

  return (
    <div className="mt-18 min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-full bg-green-600 flex items-center justify-center text-5xl text-white mb-4">
            {initial}
            <div
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-300"
              onClick={() => setEditMode(!editMode)}
              title={editMode ? "Cancel Edit" : "Edit Profile"}
            >
              <FaEdit size={16} />
            </div>
          </div>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-center mb-2"
            />
          ) : (
            <h2 className="text-2xl font-bold">{recruiter?.name}</h2>
          )}
          {editMode ? (
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-center mb-2"
            />
          ) : (
            <p className="text-gray-500">{recruiter?.email}</p>
          )}
          {editMode ? (
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full text-center"
            />
          ) : (
            <p className="text-gray-400">{recruiter?.company}</p>
          )}
          {editMode && (
            <button
              onClick={handleSave}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
            >
              <FaSave /> Save Changes
            </button>
          )}
          {!editMode && (
            <button
              onClick={() => navigate("/recruiter-dashboard")}
              className="mt-4 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Back to Dashboard
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-2xl p-6">
          {/* Tabs */}
          <div className="flex gap-4 border-b mb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "overview" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaUserCircle className="inline mr-2" /> Overview
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "jobs" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaBriefcase className="inline mr-2" /> Jobs
            </button>
            <button
              onClick={() => setActiveTab("applicants")}
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "applicants" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaUsers className="inline mr-2" /> Applicants
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "analytics" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaChartBar className="inline mr-2" /> Analytics
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <p className="text-gray-600">{recruiter?.additionalInfo || "No additional info."}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg shadow text-center">
                  <p className="font-semibold text-lg">{jobsPosted.length}</p>
                  <p className="text-gray-500">Jobs Posted</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow text-center">
                  <p className="font-semibold text-lg">{applicants.length}</p>
                  <p className="text-gray-500">Applicants</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "jobs" && (
            <div className="space-y-4">
              {jobsPosted.map((job, i) => (
                <div key={i} className="p-4 border rounded-lg flex justify-between items-center hover:shadow-md transition">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-gray-500">{job.applicants} Applicants</p>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">View</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "applicants" && (
            <div className="space-y-4">
              {applicants.map((app, i) => (
                <div key={i} className="p-4 border rounded-lg flex justify-between items-center hover:shadow-md transition">
                  <div>
                    <h3 className="font-semibold">{app.name}</h3>
                    <p className="text-gray-500">{app.position}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      app.status === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
