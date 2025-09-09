import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/assets/Bm Academy logo .png";
import LoginModal from "../../Auth/LoginModal";
import RegisterModal from "../../Auth/RegisterModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith("/dashboard")) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-30 transition-all duration-300 flex items-center justify-between px-4 md:px-6 h-20 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="BM Academy"
              className="max-h-16 md:max-h-20 w-auto object-contain"
            />
            <span
              className={`font-bold text-lg transition-colors duration-300 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              ABM PORTAL
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors duration-300 ${
                scrolled ? "text-green-800" : "text-green"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button type="primary" onClick={() => setIsLoginOpen(true)}>
            Login
          </Button>
          <Button
            type="primary"
            onClick={() => setIsRegisterOpen(true)}
            className="!bg-green-600 hover:!bg-green-700 !border-none px-6"
          >
            Register
          </Button>
          <Button
            type="primary"
            onClick={() => (window.location.href = "/recruiter-home")}
            className="!bg-green-600 hover:!bg-green-700 !border-none px-6"
          >
            Recruiter
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center z-40">
          <button
            aria-label="Open menu"
            onClick={() => setDrawerVisible(true)}
            className="text-2xl text-black font-bold"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title={null}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={windowWidth >= 768 ? "50%" : "100%"} // Half width on md+, full on sm
        bodyStyle={{ padding: 0 }}
        closable={false}
      >
        <div className="h-screen w-full bg-white flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-bold text-lg">Menu</span>
            <FaTimes
              className="cursor-pointer text-2xl"
              onClick={() => setDrawerVisible(false)}
            />
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setDrawerVisible(false)}
                className="text-gray-700 hover:text-green-700 font-medium transition"
              >
                {link.name}
              </Link>
            ))}

            {/* Login Button */}
            <Button
              type="primary"
              onClick={() => {
                setIsLoginOpen(true);
                setDrawerVisible(false);
              }}
              className="w-full text-left mt-4 bg-black text-white relative overflow-hidden rounded-xl shadow-md transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0"
            >
              Login
            </Button>

            {/* Sign Up Button */}
            <Button
              type="primary"
              onClick={() => {
                setIsRegisterOpen(true);
                setDrawerVisible(false);
              }}
              className="w-full mt-2 bg-black text-white relative overflow-hidden rounded-xl shadow-md transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0"
            >
              Sign Up
            </Button>

            {/* Recruiter */}
            <Link
              to="/recruiter-home"
              onClick={() => setDrawerVisible(false)}
              className="mt-4 font-semibold text-gray-700 hover:text-green-700"
            >
              Recruiter
            </Link>
          </div>
        </div>
      </Drawer>

      {/* Modals */}
      <LoginModal
        visible={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoginOpen(false);
          navigate("/dashboard");
        }}
      />
      <RegisterModal
        visible={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        openLoginModal={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}
