// src/components/JobGrid.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Tag, Button } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";

const { Meta } = Card;

// Badge colors
const badgeColors = {
  Featured: "green",
  Urgent: "orange",
  Freelancer: "blue",
  "Part Time": "purple",
  Internship: "red",
};

export default function JobGrid() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/static/data.json")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const getBadgeColor = (badge) =>
    badgeColors[badge] ||
    `#${([...badge].reduce((acc, char) => acc + char.charCodeAt(0), 0) % 16777215).toString(16)}`;

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 box-border overflow-hidden">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2" data-aos="fade-down">
        Featured Jobs
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base" data-aos="fade-up">
        Discover your next opportunity with top companies around the world.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {jobs.map((job, idx) => (
            <Card
              key={idx}
              hoverable
              cover={
                <img
                  alt={job.title || "Job Logo"}
                  src={job.logo || "/placeholder.png"}
                  className="h-40 sm:h-48 w-full object-cover rounded-t-2xl"
                  style={{ maxWidth: "100%", display: "block" }}
                />
              }
              className="rounded-2xl shadow-md flex flex-col justify-between w-full"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {job.badges?.map((badge, i) => (
                  <Tag key={i} color={getBadgeColor(badge)} className="text-xs sm:text-sm">
                    {badge}
                  </Tag>
                ))}
              </div>

              {/* Job Info */}
              <Meta
                title={<span className="font-semibold text-sm sm:text-base">{job.title || "Untitled Job"}</span>}
                description={<span className="text-gray-500 text-xs sm:text-sm">{job.skills || "N/A"}</span>}
              />

              {/* Salary & Openings */}
              <div className="flex justify-between items-center mt-4 mb-3 text-xs sm:text-sm">
                <span className="font-bold text-gray-800">{job.salary || "N/A"}</span>
                <Tag color="green">{job.openings ?? 0} Open</Tag>
              </div>

              {/* Apply Button */}
              <Button type="primary" block className="!rounded-full mt-auto text-xs sm:text-sm">
                Apply Now
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
