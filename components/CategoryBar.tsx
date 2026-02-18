
import React from 'react';
import { Category, CATEGORIES } from '../types';

interface CategoryBarProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex overflow-x-auto no-scrollbar pb-2 space-x-3 items-center">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 ring-2 ring-cyan-400/20'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          {category.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
