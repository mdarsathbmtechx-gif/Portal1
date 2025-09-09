// src/modules/Recruiter/Layout/RecruiterNavbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu, Drawer } from "antd";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/assets/Bm Academy logo .png";
import RecruiterLogin from "../RecruiterAuth/RecruiterLogin";

export default function RecruiterNavbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { key: "1", label: <Link to="/recruiter-home">Home</Link> },
  ];

  // Common button styles
  const greenBtnClass =
    "px-5 py-2 rounded-md w-full text-left transition-colors duration-200 hover:bg-green-700";
  const blueBtnClass =
    "px-5 py-2 rounded-md w-full text-left transition-colors duration-200 hover:bg-blue-700";

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Recruiter Logo" className="h-10 w-auto" />
            <span className="font-bold text-xl text-black">Recruiter Portal</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Menu
              mode="horizontal"
              items={menuItems}
              className="border-0 bg-transparent font-medium text-black"
              overflowedIndicator={null}
            />
            <Button
              type="primary"
              style={{ background: "#16a34a", borderColor: "#16a34a" }}
              className="px-5 transition-colors duration-200 hover:bg-green-700"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </Button>

            <Link to="/recruiter/post-job">
              <Button
                type="primary"
                style={{ background: "#16a34a", borderColor: "#16a34a" }}
                className="px-5 transition-colors duration-200 hover:bg-green-700"
              >
                Post a Job
              </Button>
            </Link>

            <Link to="/jobseekers">
              <Button
                type="primary"
                style={{ background: "#2563eb", borderColor: "#2563eb" }}
                className="px-5 transition-colors duration-200 hover:bg-blue-700"
              >
                For Jobseekers
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setDrawerVisible(true)}
              className="text-2xl text-black"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Menu</span>
            <FaTimes
              className="cursor-pointer text-lg"
              onClick={() => setDrawerVisible(false)}
            />
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="flex flex-col gap-3 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.label.props.to}
              className="font-medium text-black hover:text-green-700 transition-colors duration-200"
              onClick={() => setDrawerVisible(false)}
            >
              {item.label.props.children}
            </Link>
          ))}

          <Button
            type="primary"
            className={greenBtnClass}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a" }}
            onClick={() => {
              setIsLoginOpen(true);
              setDrawerVisible(false);
            }}
          >
            Login
          </Button>

          <Button
            type="primary"
            className={greenBtnClass}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a" }}
            onClick={() => {
              navigate("/recruiter/post-job");
              setDrawerVisible(false);
            }}
          >
            Post a Job
          </Button>

          <Button
            type="primary"
            className={blueBtnClass}
            style={{ backgroundColor: "#2563eb", borderColor: "#2563eb" }}
            onClick={() => {
              navigate("/jobseekers");
              setDrawerVisible(false);
            }}
          >
            For Jobseekers
          </Button>
        </div>
      </Drawer>

      {/* Recruiter Login Popup */}
      <RecruiterLogin
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(recruiter) => {
          // Save recruiter session
          localStorage.setItem("recruiter", JSON.stringify(recruiter));
          setIsLoginOpen(false);
          navigate("/recruiter-home"); // ✅ Redirect to recruiter dashboard
        }}
      />
    </>
  );
}
