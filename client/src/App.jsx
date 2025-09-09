import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Layout from "./modules/Homepages/Layout/Layout";
import Homepage from "./modules/Homepages/Pages/Homepage";  
import Register from "./modules/Auth/Register"; 
import Jobs from "./modules/Homepages/Pages/Jobs";
import { Scrolltotop } from "./Scrolltotop";  
import RecruiterHome from "./modules/Recruiter/RecruiterHome";
import RecruiterLayout from "./modules/Recruiter/RecruiterLayout/RecruiterLayout";  
import PostJob from "./modules/Recruiter/Pages/PostJob";
import Profile from "./modules/Homepages/Pages/Profile";
import Companies from "./modules/Homepages/Pages/Companies";
import LoginDashboard from "./modules/Dashboard/LoginDashboard";
import UserDashboard from "./modules/Dashboard/UserDashboard";
import RecruiterDashboard from "./modules/Recruiter/Dashboard/RecruiterDashboard";  // ✅ Import
import RecruiterProfile from "./modules/Recruiter/RecruiterProfile";


function App() {
  return (
    <>
      <Scrolltotop />
      <Routes>
        {/* ---------- Normal Website Layout ---------- */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/jobseekers" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/LoginDashboard" element={<LoginDashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/jobs" element={<Jobs />} /> 
          <Route path="/profile" element={<Profile/>}/>
        </Route>

        {/* ---------- User Dashboard (No Navbar) ---------- */}
        <Route path="/user-dashboard" element={<UserDashboard />} />


        {/* ---------- Recruiter Dashboard (No Navbar) ---------- */}
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />   {/* ✅ Add this */}

        {/* ---------- Recruiter Layout ---------- */}
        <Route element={<RecruiterLayout />}>
          <Route path="/recruiter-home" element={<RecruiterHome />} />
          <Route path="/recruiter/post-job" element={<PostJob />} />
          <Route path="/recruiter/profile" element={<RecruiterProfile />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
