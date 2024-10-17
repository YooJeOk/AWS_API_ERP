import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ul className="nav nav-pills mb-1 mt-3 fs-5 text-bold">
      {categories.map((category) => (
        <li className="nav-item" key={category}>
          <button 
            className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategorySelector;