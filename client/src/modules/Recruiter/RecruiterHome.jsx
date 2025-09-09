import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Row, Col, Input, message, Tabs } from "antd";
import { FaUserTie, FaUsers, FaSearch } from "react-icons/fa";
import RecruiterNavbar from "./RecruiterLayout/RecruiterNavbar";

const { Title, Text } = Typography;

export default function RecruiterHome() {
  const [activeTab, setActiveTab] = useState("register");
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    gst: "",
    password: "",
    confirmPassword: "",
    otp: "",
    terms: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setFormVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendOtp = () => {
    if (!formData.phone) {
      message.error("Please enter phone number first");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    setGeneratedOtp(otp);
    setOtpSent(true);
    message.success(`OTP sent! (For demo: ${otp})`);
  };

  const handleSubmit = () => {
    const { companyName, phone, gst, password, confirmPassword, otp, terms } = formData;

    if (!companyName || !phone || !gst || !password || !confirmPassword) {
      message.error("Please fill in all fields");
      return;
    }
    if (!terms) {
      message.error("You must agree to the Terms & Conditions");
      return;
    }
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    if (!otpSent || !otp) {
      message.error("Please verify your phone number with OTP");
      return;
    }
    if (parseInt(otp) !== generatedOtp) {
      message.error("Invalid OTP. Please try again.");
      return;
    }

    message.success("Registered successfully!");
    console.log("Form Data:", formData);

    setFormData({
      companyName: "",
      phone: "",
      gst: "",
      password: "",
      confirmPassword: "",
      otp: "",
      terms: false,
    });
    setOtpSent(false);
    setGeneratedOtp(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <RecruiterNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 to-teal-600 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-6">
          {/* Hero Text */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Title level={1} className="text-4xl md:text-5xl font-extrabold leading-snug mb-6">
              Decode India's largest talent pool with the power of{" "}
              <span className="text-yellow-300">AI</span>
            </Title>
            <Text className="text-lg md:text-xl text-green-100 mb-6 block">
              <span className="font-semibold">10 crore+</span> registered jobseekers for your talent needs.
              <br />
              Most advanced recruitment AI.
            </Text>
            <Button
              type="primary"
              size="large"
              className="bg-yellow-400 text-gray-900 font-semibold rounded-lg px-8 py-3 hover:bg-yellow-500"
            >
              Explore Products
            </Button>
          </div>

          {/* Register Form */}
          <div
            className={`md:w-96 bg-white text-gray-800 p-6 rounded-xl shadow-xl transform transition-transform duration-700 ease-out
              ${formVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              type="card"
              size="large"
              items={[
                {
                  key: "register",
                  label: "Register",
                  children: (
                    <div className="flex flex-col gap-4 p-2">
                      {/* Company Name */}
                      <div>
                        <label className="text-gray-600 text-sm font-medium mb-1 block">
                          Company Name
                        </label>
                        <Input
                          type="text"
                          name="companyName"
                          placeholder="Enter your company name"
                          value={formData.companyName}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Phone + OTP */}
                      <div>
                        <label className="text-gray-600 text-sm font-medium mb-1 block">
                          Phone Number
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          <Button type="primary" onClick={handleSendOtp}>
                            {otpSent ? "Resend OTP" : "Send OTP"}
                          </Button>
                        </div>
                      </div>

                      {/* OTP input (only show after Send OTP) */}
                      {otpSent && (
                        <div>
                          <label className="text-gray-600 text-sm font-medium mb-1 block">
                            Enter OTP
                          </label>
                          <Input
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            value={formData.otp}
                            onChange={handleChange}
                          />
                        </div>
                      )}

                      {/* GST */}
                      <div>
                        <label className="text-gray-600 text-sm font-medium mb-1 block">
                          GST Number
                        </label>
                        <Input
                          type="text"
                          name="gst"
                          placeholder="Enter GST number"
                          value={formData.gst}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Password */}
                      <div>
                        <label className="text-gray-600 text-sm font-medium mb-1 block">
                          Password
                        </label>
                        <Input.Password
                          name="password"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="text-gray-600 text-sm font-medium mb-1 block">
                          Confirm Password
                        </label>
                        <Input.Password
                          name="confirmPassword"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Terms */}
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          name="terms"
                          id="terms"
                          checked={formData.terms}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <label htmlFor="terms" className="text-gray-600 text-sm">
                          I agree to the{" "}
                          <span className="text-blue-500 underline cursor-pointer">
                            Terms & Conditions
                          </span>
                        </label>
                      </div>

                      <Button
                        type="primary"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleSubmit}
                      >
                        Register
                      </Button>

                      <Text className="block mt-4 text-center text-gray-500 text-sm">
                        Already have an account?{" "}
                        <span className="text-blue-500 underline cursor-pointer">Log in</span>
                      </Text>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
