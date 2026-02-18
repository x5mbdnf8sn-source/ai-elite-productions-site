import React from 'react';

const CategoryBar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex overflow-x-auto no-scrollbar pb-2 space-x-3 items-center justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
            selectedCategory === category
              ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-900/40 scale-105'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          {category.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;