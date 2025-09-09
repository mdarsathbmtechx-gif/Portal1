// src/routes/Auth.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "@/modules/Auth/Register"; 
import  Login  from "./modules/Auth/Login";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}
