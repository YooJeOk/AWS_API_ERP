import React, { useState } from 'react';
import MenuItem from './MenuItem.js';
import { CaretLeft, CaretRight } from 'react-bootstrap-icons';
import BreadModal from './BreadModal.js';
import CoffeeModal from './CoffeeModal.js';


const MenuList = ({ items, onAddToCart, additionalOptions,currentPage, totalPages, onPageChange }) => {
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
      <button onClick={handlePrevPage} disabled={currentPage === 0} className="page-button">
        <CaretLeft/>
      </button>
      <div className="menu-container">
        {Array.isArray(items) && items.map((item) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            onSelect={() => setSelectedItem(item)}
          />
        ))}
      </div>
      <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="page-button">
        <CaretRight />
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