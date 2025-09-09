// src/components/RegisterModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input, Button, Divider, Typography } from "antd";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/firebase";

const { Title } = Typography;

export default function RegisterModal({ visible, onClose }) {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSendOtp = () => {
    const phone = form.getFieldValue("phone");
    if (!phone) {
      alert("Please enter your phone number first.");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert(`Your OTP is: ${otp} (for demo only)`);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (!otpSent || parseInt(values.otp) !== generatedOtp) {
        alert("Please verify your phone number with OTP.");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: values.fullName,
          phone: values.phone,
          email: values.email,
        })
      );

      onClose();
      navigate("/user-dashboard");
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={visible} onCancel={onClose} destroyOnClose footer={null}>
      <div className="p-6">
        <Title level={3} className="!mb-4 text-gray-800">
          Create your account
        </Title>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input
              prefix={<FaUser className="text-gray-400" />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input
              prefix={<FaPhone className="text-gray-400" />}
              placeholder="Enter your phone number"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              prefix={<FaEnvelope className="text-gray-400" />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
            hasFeedback
          >
            <Input.Password
              prefix={<FaLock className="text-gray-400" />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<FaLock className="text-gray-400" />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Button
            type="primary"
            className="!bg-blue-600 hover:!bg-blue-700 mb-3"
            onClick={handleSendOtp}
            block
          >
            {otpSent ? "Resend OTP" : "Send OTP"}
          </Button>

          {otpSent && (
            <Form.Item
              label="OTP"
              name="otp"
              rules={[{ required: true, message: "Please enter the OTP" }]}
            >
              <Input
                prefix={<FaKey className="text-gray-400" />}
                placeholder="Enter OTP"
              />
            </Form.Item>
          )}

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            size="large"
            className="!bg-green-600 hover:!bg-green-700 font-semibold"
          >
            Register
          </Button>
        </Form>

        <Divider plain>Or</Divider>
        <Button
          block
          size="large"
          onClick={async () => {
            try {
              await signInWithGoogle();
              onClose();
              navigate("/user-dashboard");
            } catch (error) {
              console.error(error);
            }
          }}
          className="flex items-center justify-center gap-2 !bg-white hover:!bg-gray-50 border border-gray-300 font-medium"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </Button>

        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </Modal>
  );
}
