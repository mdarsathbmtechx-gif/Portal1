import React, { useEffect, useState } from "react";

export default function CategorySection({ onFilter }) {
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);

  // Fetch categories from JSON
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/static/Categories.json");
        const data = await res.json();
        setTopics(data.topics);
        setCategories(data.categories);
      } catch (err) {
        console.error("Failed to load categories.json", err);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (item) => {
    setSelected(item);
    if (onFilter) onFilter(item);
  };

  const buttonClasses = (item) =>
    `px-4 py-2 rounded-full border font-medium transition 
     ${
       selected === item
         ? "bg-blue-600 text-white border-blue-600"
         : "bg-white border-gray-300 hover:bg-gray-100"
     }`;

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Explore Topics */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Explore topics you are interested in
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className={buttonClasses("All")} onClick={() => handleClick("All")}>
              See All Topics
            </button>
            {topics.length > 0 ? (
              topics.map((topic, i) => (
                <button
                  key={i}
                  className={buttonClasses(topic)}
                  onClick={() => handleClick(topic)}
                >
                  {topic}
                </button>
              ))
            ) : (
              <p>Loading topics...</p>
            )}
          </div>
        </div>

        {/* Job Categories */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Find the right job or internship for you
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.length > 0 ? (
              categories.map((cat, i) => (
                <button
                  key={i}
                  className={buttonClasses(cat)}
                  onClick={() => handleClick(cat)}
                >
                  {cat}
                </button>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
            <button className={buttonClasses("Show more")} onClick={() => handleClick("Show more")}>
              Show more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
