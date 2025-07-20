import React from "react";

const categories = [
  "All",
  "Live",
  "Gulshan Kumar",
  "Music",
  "Mixes",
  "JavaScript",
  "Disha Vakani",
  "Data Structures",
  "Om",
  "Ramayan",
  "Chants"
];

const CategoryFilter = () => {
  return (
    <div className="flex gap-3 overflow-x-auto p-4 bg-black border-b border-gray-700">
      {categories.map((cat, index) => (
        <button
          key={index}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg whitespace-nowrap text-sm"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
