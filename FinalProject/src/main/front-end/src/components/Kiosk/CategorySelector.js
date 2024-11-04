import React from 'react';
import useClickSound from '../../hooks/useClickSound';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  const ClickSound = useClickSound(); 

  return (
    <ul className="nav nav-pills mb-1 mt-3 fs-5 text-bold">
      {categories.map((category) => (
        <li className="nav-item" key={category}>
          <button 
            className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => {
              ClickSound(); 
              onSelectCategory(category); 
            }}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategorySelector;
