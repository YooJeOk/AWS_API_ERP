import React, { useState } from 'react';
import MenuItem from './MenuItem.js';
import { CaretLeft, CaretRight } from 'react-bootstrap-icons';
import BreadModal from './BreadModal.js';
import CoffeeModal from './CoffeeModal.js';

const MenuList = ({ items, onAddToCart, additionalOptions, currentPage, totalPages, onPageChange }) => {
  console.log('Current page:', currentPage); // 추가된 로그

  const [selectedItem, setSelectedItem] = useState(null);
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="tab-content pt-1">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 0}
        className="menu-page-button"
      >
        <CaretLeft 
          style={{ 
            opacity: currentPage === 0 ? 0.2 : 1, 
            transition: 'opacity 0.3s ease'
          }} 
        />
      </button>

      <div className="menu-container">
        {Array.isArray(items) && items.map((item, index) => (
          <MenuItem
            key={`${item.type}-${item.name}-${index}`} 
            item={item}
            onSelect={() => setSelectedItem(item)}
          />
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
        className="menu-page-button"
      >
        <CaretRight 
          style={{ 
            opacity: currentPage === totalPages - 1 ? 0.5 : 1,
            transition: 'opacity 0.3s ease' 
          }} 
        />
      </button>

      {selectedItem && selectedItem.type === 'bread' && (
        <BreadModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={onAddToCart}
        />
      )}

      {selectedItem && selectedItem.type === 'coffee' && (
        <CoffeeModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={onAddToCart}
          additionalOptions={additionalOptions}
        />
      )}
    </div>
  );
};

export default MenuList;
