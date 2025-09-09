import React, { useState } from "react";
import { Input, Button, Checkbox, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

export default function LoginDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  // Fake authentication (no backend)
  if (email && password) {
    // Save user info to localStorage
    localStorage.setItem("user", JSON.stringify({ email }));

    // Redirect to user dashboard
    navigate("/user-dashboard");
  } else {
    alert("Please enter valid credentials");
  }
};


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-green-400 items-center justify-center">
        <img
          src="/login-illustration.png" // placeholder image in public folder
          alt="Job Portal Login"
          className="max-w-md"
        />
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Login to your job portal account
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              placeholder="Email or Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-between items-center">
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              >
                Remember me
              </Checkbox>
              <Link to="/forgot-password" className="text-green-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="bg-green-600 hover:bg-green-700"
            >
              Login
            </Button>
          </form>

          <Divider>Or continue with</Divider>

          {/* Social Login */}
          <div className="flex gap-4 justify-center">
            <Button
              icon={<GoogleOutlined />}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Google
            </Button>
            <Button
              icon={<FacebookOutlined />}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Facebook
            </Button>
          </div>

          {/* Register link */}
          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
