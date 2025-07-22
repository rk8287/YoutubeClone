import React from "react";

const categories = [
  "All",
  "Interviews",
  "CRUD",
  "Vlog",
  "Clone App",
  "JavaScript",
  "Productivity",
  "Data Structures",
  "Software Engineer",
  "React JS",
  "Track Tutorial"
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex gap-3 overflow-x-auto p-3 md:p-4 bg-black border-b border-gray-700 scrollbar-hide">
      {categories.map((cat, index) => (
        <button
          key={index}
          onClick={() => setSelectedCategory(cat)}
          className={`px-3 py-1.5 md:px-4 md:py-2 ${
            selectedCategory === cat ? "bg-gray-600" : "bg-gray-800"
          } hover:bg-gray-700 rounded-full whitespace-nowrap text-xs md:text-sm`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
