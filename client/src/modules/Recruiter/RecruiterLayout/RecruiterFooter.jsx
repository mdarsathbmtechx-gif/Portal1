// src/modules/Recruiter/RecruiterFooter.jsx
import React from "react";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from "@/assets/Bm Academy logo .png"; // adjust logo path

export default function RecruiterFooter() {
  return (
    <footer className="bg-[#0a0f1c] text-gray-300 pt-10 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Recruiter Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Recruiter services</h3>
          <ul className="space-y-2">
            <li>Job Posting</li>
            <li>Resume Database (Resdex)</li>
            <li>Assisted Hiring</li>
            <li>Employer Branding</li>
            <li>Talent Pulse</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-white font-semibold mb-4">Information</h3>
          <ul className="space-y-2">
            <li>About us</li>
            <li>Clients</li>
            <li>Careers</li>
            <li>Terms & Conditions</li>
            <li>Privacy policy</li>
            <li>Jobseeker home</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>Grievances</li>
            <li>Summons and Notice</li>
            <li>Trust and Safety</li>
            <li>Whitehat</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer support</h3>
          <ul className="space-y-2">
            <li>Toll Free: 1800 102 5558</li>
            <li>(10:00 AM to 6:00 PM, Mon - Sat)</li>
            <li>support@yourdomain.com</li>
          </ul>
        </div>

        {/* Sales Enquiries */}
        <div>
          <h3 className="text-white font-semibold mb-4">Sales enquiries</h3>
          <ul className="space-y-2">
            <li>India: +91 98188 82211</li>
            <li>sales@yourdomain.com</li>
            <li>USA: +1 866 557 3340</li>
            <li>usa@yourdomain.com</li>
            <li>Europe/UK: +44 808 120 2323</li>
            <li>europe@yourdomain.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-gray-400">© 2025 Bm Academy | All Rights Reserved</span>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0 text-xl text-gray-400">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin className="hover:text-white" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube className="hover:text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
