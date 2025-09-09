// src/modules/Recruiter/RecruiterAuth/RecruiterLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input, Button, Divider, Typography } from "antd";
import { FaEnvelope, FaLock, FaPhone, FaKey } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const { Title, Link } = Typography;

export default function RecruiterLogin({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    otp: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = () => {
    if (!formData.emailOrPhone) {
      alert("Please enter your phone number first");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert(`Your OTP is: ${otp} (for demo only)`);
  };

  const handleSubmit = () => {
    setLoading(true);
    const { emailOrPhone, password, otp } = formData;

    if (!emailOrPhone) {
      alert("Please enter your email or phone");
      setLoading(false);
      return;
    }

    if (useOtp) {
      if (!otpSent || !otp) {
        alert("Please send and enter OTP to login");
        setLoading(false);
        return;
      }
      if (parseInt(otp) !== generatedOtp) {
        alert("Invalid OTP");
        setLoading(false);
        return;
      }
    } else {
      if (!password) {
        alert("Please enter your password");
        setLoading(false);
        return;
      }
      // 🔹 Fake password check (demo)
    }

    // 🔹 Save recruiter info
    localStorage.setItem("recruiter", JSON.stringify({ emailOrPhone }));

    setLoading(false);
    onClose();
    navigate("/recruiter-dashboard");
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={600} className="!p-0">
      <div className="flex flex-col md:flex-row">
        {/* Left Info */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 flex flex-col justify-center border-r">
          <Title level={4} className="!mb-4">Welcome Recruiter!</Title>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>Post jobs quickly and easily</li>
            <li>Access a wide pool of jobseekers</li>
            <li>Manage applicants efficiently</li>
          </ul>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-2/3 p-6">
          <Title level={3} className="!mb-4 text-gray-800">
            {useOtp ? "Login with OTP" : "Recruiter Login"}
          </Title>

          <Form layout="vertical" className="space-y-3" onFinish={handleSubmit}>
            {/* Email/Phone input */}
            <Form.Item
              label={useOtp ? "Phone Number" : "Email or Phone"}
              name="emailOrPhone"
              rules={[{ required: true, message: `Please enter your ${useOtp ? "phone" : "email or phone"}` }]}
            >
              <Input
                prefix={useOtp ? <FaPhone className="text-gray-400" /> : <FaEnvelope className="text-gray-400" />}
                placeholder={useOtp ? "Enter phone number" : "Enter your email or phone"}
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
              />
            </Form.Item>

            {/* Password input */}
            {!useOtp && (
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password
                  prefix={<FaLock className="text-gray-400" />}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Item>
            )}

            {/* OTP input */}
            {useOtp && otpSent && (
              <Form.Item
                label="OTP"
                name="otp"
                rules={[{ required: true, message: "Please enter OTP" }]}
              >
                <Input
                  prefix={<FaKey className="text-gray-400" />}
                  placeholder="Enter OTP"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </Form.Item>
            )}

            {/* Send OTP Button */}
            {useOtp && (
              <Button
                type="primary"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSendOtp}
              >
                {otpSent ? "Resend OTP" : "Send OTP"}
              </Button>
            )}

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size="large"
              className="!bg-green-600 hover:!bg-green-700 font-semibold"
            >
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Link
              className="text-sm font-medium cursor-pointer"
              onClick={() => {
                setUseOtp((prev) => !prev);
                setOtpSent(false);
                setFormData({ emailOrPhone: "", password: "", otp: "" });
              }}
            >
              {useOtp ? "Use Password to Login" : "Use OTP to Login"}
            </Link>
          </div>

          <Divider plain>Or</Divider>
          <Button
            block
            size="large"
            className="flex items-center justify-center gap-2 !bg-white hover:!bg-gray-50 border border-gray-300 font-medium"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-3">
            New recruiter?{" "}
            <a href="/recruiter-register" className="text-green-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
