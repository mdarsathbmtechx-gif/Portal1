// src/modules/Homepages/Pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBriefcase,
  FaBookmark,
  FaChartBar,
  FaFileUpload,
  FaStar,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "",
  });
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
    } else {
      setProfile(storedUser);
      setForm({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        location: storedUser.location || "",
        role: storedUser.role || "Software Engineer",
      });
    }

    setApplications(JSON.parse(localStorage.getItem("applications")) || []);
    setSavedJobs(JSON.parse(localStorage.getItem("savedJobs")) || []);
    setResumeUploaded(localStorage.getItem("resumeUploaded") === "true");
    setSkills(JSON.parse(localStorage.getItem("userSkills")) || ["React.js","Node.js","SQL"]);
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    const updated = { ...profile, ...form };
    localStorage.setItem("user", JSON.stringify(updated));
    setProfile(updated);
    setEditMode(false);
  };

  const handleResumeUpload = () => {
    setResumeUploaded(true);
    localStorage.setItem("resumeUploaded", "true");
  };

  // Profile completeness
  const totalSections = 6;
  let completed = 0;
  if (form.name) completed++;
  if (form.email) completed++;
  if (form.phone) completed++;
  if (form.location) completed++;
  if (resumeUploaded) completed++;
  if (skills.length > 0) completed++;
  const profileCompleteness = Math.round((completed / totalSections) * 100);

  let progressColor = "bg-red-500";
  if (profileCompleteness > 40 && profileCompleteness <= 70) {
    progressColor = "bg-yellow-400";
  } else if (profileCompleteness > 70) {
    progressColor = "bg-green-500";
  }

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.keys(statusCounts).map((k) => ({
    name: k,
    value: statusCounts[k],
  }));
  const COLORS = ["#22c55e", "#ef4444", "#facc15"];
  const initial = profile?.name?.charAt(0) || "U";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 h-48">
        <div className="absolute -bottom-14 left-10 flex items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-5xl font-bold shadow-lg">
            {initial}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{profile?.name}</h1>
            <p className="text-gray-200">{profile?.role || "Your Role"}</p>
            <p className="text-gray-300">{profile?.location || "Add Location"}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          {[
            { key: "overview", label: "Overview", icon: <FaUserCircle /> },
            { key: "applications", label: "Applications", icon: <FaBriefcase /> },
            { key: "saved", label: "Saved Jobs", icon: <FaBookmark /> },
            { key: "analytics", label: "Analytics", icon: <FaChartBar /> },
            { key: "resume", label: "Resume", icon: <FaFileUpload /> },
            { key: "skills", label: "Skills", icon: <FaStar /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-t-lg flex items-center gap-2 ${
                activeTab === tab.key
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Profile Completeness */}
            <div className="bg-white shadow rounded-xl p-6 relative">
              <div className="flex justify-between mb-2">
                <p className="font-semibold">Profile Completeness</p>
                <p className="font-bold text-indigo-600">{profileCompleteness}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${progressColor} h-3 rounded-full transition-all`}
                  style={{ width: `${profileCompleteness}%` }}
                ></div>
              </div>
              <p className="text-gray-500 mt-2 text-sm">
                Complete your profile to attract more recruiters.
              </p>
            </div>

            {/* Profile Info */}
            <div className="bg-white shadow rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 text-green-600 hover:text-green-800"
                  >
                    <FaSave /> Save
                  </button>
                )}
              </div>

              {!editMode ? (
                <div className="space-y-2">
                  <p><span className="font-semibold">Name:</span> {profile?.name}</p>
                  <p><span className="font-semibold">Email:</span> {profile?.email}</p>
                  <p><span className="font-semibold">Phone:</span> {profile?.phone}</p>
                  <p><span className="font-semibold">Location:</span> {profile?.location}</p>
                  <p><span className="font-semibold">Role:</span> {profile?.role}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["name", "email", "phone", "location", "role"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      placeholder={`Enter ${field}`}
                      value={form[field]}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-xl p-6 text-center">
                <p className="text-2xl font-bold">{applications.length}</p>
                <p className="text-gray-500">Applications</p>
              </div>
              <div className="bg-white shadow rounded-xl p-6 text-center">
                <p className="text-2xl font-bold">{savedJobs.length}</p>
                <p className="text-gray-500">Saved Jobs</p>
              </div>
              <div className="bg-white shadow rounded-xl p-6 text-center">
                <p className="text-2xl font-bold">{profileCompleteness}%</p>
                <p className="text-gray-500">Profile Score</p>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {applications.length ? (
              applications.map((app, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg flex justify-between items-center bg-white hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-semibold">{app.title}</h3>
                    <p className="text-gray-500">{app.company}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      app.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No applications found.</p>
            )}
          </div>
        )}

        {/* Saved Jobs Tab */}
        {activeTab === "saved" && (
          <div className="space-y-4">
            {savedJobs.length ? (
              savedJobs.map((job, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg flex justify-between items-center bg-white hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-gray-500">{job.company}</p>
                  </div>
                  <button className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition">
                    View
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No saved jobs found.</p>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="bg-white shadow rounded-xl p-6 h-72">
            {pieData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center mt-20">
                No analytics data available.
              </p>
            )}
          </div>
        )}

        {/* Resume Tab */}
        {activeTab === "resume" && (
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <p className="text-lg font-semibold mb-4">
              Upload your latest Resume
            </p>
            <button
              onClick={handleResumeUpload}
              disabled={resumeUploaded}
              className={`bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition mx-auto ${
                resumeUploaded ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaFileUpload /> {resumeUploaded ? "Resume Uploaded" : "Upload Resume"}
            </button>
            <p className="text-gray-500 mt-4">Supported: PDF, DOC, DOCX</p>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="font-semibold mb-3">Your Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1"
                >
                  {skill}
                  <button
                    onClick={() => {
                      const updatedSkills = skills.filter((_, idx) => idx !== i);
                      setSkills(updatedSkills);
                      localStorage.setItem("userSkills", JSON.stringify(updatedSkills));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="border rounded-lg p-2 flex-1"
              />
              <button
                onClick={() => {
                  const skillTrim = newSkill.trim();
                  if (skillTrim && !skills.includes(skillTrim)) {
                    const updatedSkills = [...skills, skillTrim];
                    setSkills(updatedSkills);
                    setNewSkill("");
                    localStorage.setItem("userSkills", JSON.stringify(updatedSkills));
                  }
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
