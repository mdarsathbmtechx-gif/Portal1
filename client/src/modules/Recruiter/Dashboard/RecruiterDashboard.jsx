import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaBriefcase,
  FaUsers,
  FaUserCircle,
  FaPlus,
  FaEdit,
} from "react-icons/fa";

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("jobs");

  // Applicants data
  const [applicants, setApplicants] = useState([
    { name: "John Doe", role: "Frontend Developer", status: "approved" },
    { name: "Jane Smith", role: "UI Designer", status: "under_consideration" },
    { name: "Alice Johnson", role: "Backend Developer", status: "rejected" },
  ]);

  // Jobs data
  const [jobs, setJobs] = useState([
    { title: "Software Engineer", applicants: 10 },
    { title: "UI/UX Designer", applicants: 6 },
  ]);

  // Search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const recruiter = localStorage.getItem("recruiter");
    if (!recruiter) navigate("/recruiter-home");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("recruiter");
    navigate("/recruiter-home");
  };

  const recruiter = JSON.parse(localStorage.getItem("recruiter")) || {
    name: "Recruiter",
    email: "recruiter@email.com",
    company: "Company Name",
  };

  const filteredApplicants = applicants
    .filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(app => (filterStatus ? app.status === filterStatus : true));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm flex justify-between items-center px-6 py-3 sticky top-0 z-20">
        <h1 className="text-xl font-bold text-green-600">Recruiter Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-2 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Layout */}
      <div className="flex max-w-7xl mx-auto mt-6 gap-6 px-4">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white rounded-lg shadow p-6 h-fit sticky top-20">
          <div className="flex flex-col items-center text-center mb-6">
            <FaUserCircle className="text-6xl text-green-600" />
            <h2 className="mt-3 font-semibold text-gray-800">{recruiter.name}</h2>
            <p className="text-sm text-gray-500">{recruiter.email}</p>
            <p className="text-sm text-gray-400">{recruiter.company}</p>

            <button
              onClick={() => navigate("/recruiter/profile")}
              className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-md transition"
            >
              View Profile
            </button>
          </div>

          <hr className="my-4" />

          <nav className="flex flex-col space-y-2">
            {[ 
              { name: "My Jobs", icon: <FaBriefcase />, tab: "jobs" },
              { name: "Post a Job", icon: <FaPlus />, tab: "post" },
              { name: "Applicants", icon: <FaUsers />, tab: "applicants" },
            ].map(item => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-all ${
                  activeTab === item.tab
                    ? "bg-green-600 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* My Jobs */}
          {activeTab === "jobs" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">My Posted Jobs</h2>
              <ul className="space-y-3">
                {jobs.map((job, idx) => (
                  <li key={idx} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center hover:shadow transition">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.applicants} Applicants</p>
                    </div>
                    <button
                      onClick={() => navigate(`/recruiter/job/${idx}`)}
                      className="text-green-600 hover:underline transition"
                    >
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Post Job */}
          {activeTab === "post" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Post a New Job</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-green-400"
                />
                <textarea
                  placeholder="Job Description"
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-green-400"
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow transition"
                >
                  Post Job
                </button>
              </form>
            </div>
          )}

          {/* Applicants */}
          {activeTab === "applicants" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Applicants</h2>

              {/* Search & Filter */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                <input
                  type="text"
                  placeholder="Search applicants..."
                  className="border rounded px-3 py-2 w-full md:w-1/2 focus:ring-2 focus:ring-green-400"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                  className="border rounded px-3 py-2 w-full md:w-1/3"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="under_consideration">Under Consideration</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Applicants Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center text-gray-500 py-4">
                          No applicants found
                        </td>
                      </tr>
                    )}
                    {filteredApplicants.map((applicant, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2">{applicant.name}</td>
                        <td className="px-4 py-2">{applicant.role}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                              applicant.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : applicant.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {applicant.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            className="text-green-600 hover:underline transition"
                            onClick={() => navigate(`/recruiter/applicant/${idx}`)}
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
