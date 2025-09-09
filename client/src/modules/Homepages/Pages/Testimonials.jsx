// src/components/Testimonials.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/static/Testimonials.json")
      .then((response) => {
        setTestimonials(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load testimonials");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
        <p className="text-gray-600 mt-2">
          Real stories from people who found success using our platform.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full border-4 border-green-100 object-cover mb-4"
            />
            <p className="text-gray-600 italic mb-4">“{t.quote}”</p>
            <h4 className="font-semibold text-gray-800">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
