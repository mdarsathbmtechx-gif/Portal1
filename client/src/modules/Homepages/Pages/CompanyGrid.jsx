// src/components/CompanyGrid.jsx
import React, { useEffect, useState } from "react";
import { Card, Tag, Button } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";

const { Meta } = Card;

// Optional tag colors for industries or features
const badgeColors = {
  Tech: "green",
  Design: "purple",
  AI: "orange",
  Remote: "blue",
};

export default function CompanyGrid() {
  const [companies, setCompanies] = useState([]);
  const [followed, setFollowed] = useState({}); // Track follow state

  useEffect(() => {
    fetch("http://127.0.0.1:8000/static/CompaniesGrid.json")
      .then((res) => res.json())
      .then((data) => setCompanies(data || []))
      .catch((err) => console.error("Error fetching companies:", err));

    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [companies]);

  const handleFollow = (companyName) => {
    setFollowed({ ...followed, [companyName]: !followed[companyName] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 box-border overflow-hidden">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2" data-aos="fade-down">
        Featured Companies
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base" data-aos="fade-up">
        Explore top companies and discover your next opportunity.
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        {companies.map((company, idx) => (
          <Card
            key={company.name + idx}
            hoverable
            cover={
              <img
                alt={company.name}
                src={company.logo || "/placeholder.png"}
                loading="lazy"
                className="h-40 sm:h-48 w-full object-cover rounded-t-2xl"
                style={{ maxWidth: "100%", display: "block" }}
              />
            }
            className="rounded-2xl shadow-md flex flex-col justify-between w-full"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            {/* Tags / badges */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
              {company.tags?.map((tag, i) => (
                <Tag key={i} color={badgeColors[tag] || "default"} className="text-xs sm:text-sm">
                  {tag}
                </Tag>
              ))}
            </div>

            {/* Company Info */}
            <Meta
              title={<span className="font-semibold text-sm sm:text-base">{company.name}</span>}
              description={
                <span className="text-gray-500 text-xs sm:text-sm">
                  {company.industry || "Industry Unknown"} - {company.location || "Location Unknown"}
                </span>
              }
            />

            {/* Company Size */}
            {company.size && (
              <div className="flex justify-start mt-2 mb-2 sm:mt-4 sm:mb-3 text-xs sm:text-sm">
                <Tag color="blue">{company.size}</Tag>
              </div>
            )}

            {/* Follow Button */}
            <Button
              type={followed[company.name] ? "default" : "primary"}
              block
              className="!rounded-full mt-auto text-xs sm:text-sm"
              onClick={() => handleFollow(company.name)}
              aria-label={`${followed[company.name] ? "Unfollow" : "Follow"} ${company.name}`}
            >
              {followed[company.name] ? "Following" : "Follow"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
