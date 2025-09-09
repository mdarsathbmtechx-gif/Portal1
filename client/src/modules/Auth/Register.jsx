// src/pages/Register.jsx
import React from "react";
import { Form, Input, Select, Button, Divider, Typography } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { FaUser, FaEnvelope, FaLock, FaMobileAlt, FaBriefcase } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const { Title, Text } = Typography;

export default function Register() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    // API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#004546] to-[#006d66] px-4">
      <div className="mt-18 max-w-5xl w-full bg-white shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Info Section */}
        <div className="w-full md:w-1/3 bg-gray-50 p-8 flex flex-col justify-center border-r">
          <Title level={4} className="!mb-6">On registering, you can</Title>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircleTwoTone twoToneColor="#52c41a" /> 
              Build your profile and let recruiters find you
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleTwoTone twoToneColor="#52c41a" /> 
              Get job postings delivered right to your email
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleTwoTone twoToneColor="#52c41a" /> 
              Find a job and grow your career
            </li>
          </ul>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-2/3 p-10">
          <Title level={3} className="!mb-6 text-gray-800">
            Create your Job Portal profile
          </Title>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            className="space-y-3"
          >
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[{ required: true, message: "Please enter your full name" }]}
            >
              <Input prefix={<FaUser className="text-gray-400" />} placeholder="What is your name?" />
            </Form.Item>

            <Form.Item
              label="Email ID"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input prefix={<FaEnvelope className="text-gray-400" />} placeholder="Tell us your Email ID" />
            </Form.Item>
            <Text type="secondary" className="text-xs -mt-2 block">
              We’ll send relevant jobs and updates to this email
            </Text>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password prefix={<FaLock className="text-gray-400" />} placeholder="(Minimum 6 characters)" />
            </Form.Item>

            <Form.Item
              label="Mobile number"
              name="mobile"
              rules={[{ required: true, message: "Please enter your mobile number" }]}
            >
              <Input
                addonBefore="+91"
                prefix={<FaMobileAlt className="text-gray-400" />}
                placeholder="Enter your mobile number"
              />
            </Form.Item>
            <Text type="secondary" className="text-xs -mt-2 block">
              Recruiters will contact you on this number
            </Text>

            <Form.Item
              label="Work status"
              name="workStatus"
              rules={[{ required: true, message: "Please select your work status" }]}
            >
              <Select
                placeholder="Select your work status"
                suffixIcon={<FaBriefcase className="text-gray-500" />}
              >
                <Select.Option value="fresher">Fresher</Select.Option>
                <Select.Option value="experienced">Experienced</Select.Option>
              </Select>
            </Form.Item>

            {/* Green Register Button */}
            <Button
              htmlType="submit"
              block
              type="primary"
              size="large"
              className="!bg-green-600 hover:!bg-green-700 font-semibold"
            >
              Register Now
            </Button>
          </Form>

          {/* OR Google Login */}
          <Divider plain>Or</Divider>
          <Button
            block
            size="large"
            className="flex items-center justify-center gap-2 !bg-white hover:!bg-gray-50 border border-gray-300 font-medium"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
