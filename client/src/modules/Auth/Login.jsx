// src/components/LoginModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input, Button, Divider, Typography } from "antd";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const { Title } = Typography;

export default function LoginModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (values.email && values.password) {
        localStorage.setItem("user", JSON.stringify({ email: values.email }));
        onClose();
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      destroyOnHidden
      footer={null}
      width={700}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Info */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 flex flex-col justify-center border-r">
          <Title level={4} className="!mb-4">Welcome Back!</Title>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>Access thousands of jobs instantly</li>
            <li>Stay updated with latest job postings</li>
            <li>Continue your career journey with us</li>
          </ul>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-2/3 p-6">
          <Title level={3} className="!mb-4 text-gray-800">Login to your account</Title>
          <Form layout="vertical" onFinish={handleSubmit} className="space-y-3">
            <Form.Item
              label="Email / Username"
              name="email"
              rules={[{ required: true, message: "Please enter your email/username" }]}
            >
              <Input prefix={<FaEnvelope className="text-gray-400" />} placeholder="Enter your Email / Username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password prefix={<FaLock className="text-gray-400" />} placeholder="Enter your password" />
            </Form.Item>

            <div className="flex justify-end mb-2">
              <a href="/forgot-password" className="text-sm">Forgot Password?</a>
            </div>

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
            <a href="#" className="text-sm font-medium">Use OTP to Login</a>
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
            New to our platform?{" "}
            <a href="/register" className="text-green-600 hover:underline">Register for free</a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
