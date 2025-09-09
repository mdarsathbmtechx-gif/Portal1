// src/modules/Recruiter/RecruiterLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import RecruiterNavbar from "./RecruiterNavbar";
import RecruiterFooter from "./RecruiterFooter";

export default function RecruiterLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <RecruiterNavbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <RecruiterFooter />
    </div>
  );
}
