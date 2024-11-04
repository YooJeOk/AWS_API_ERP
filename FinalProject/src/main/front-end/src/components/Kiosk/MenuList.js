import React, { useState } from 'react';
import MenuItem from './MenuItem.js';
import { CaretLeft, CaretRight } from 'react-bootstrap-icons';
import BreadModal from './BreadModal.js';
import CoffeeModal from './CoffeeModal.js';
import useClickSound from '../../hooks/useClickSound.js';

const MenuList = ({ items, onAddToCart, additionalOptions, currentPage, totalPages, onPageChange, selectedCategory }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const ClickSound = useClickSound(); 

  const handlePrevPage = () => {
    if (currentPage > 0) {
      ClickSound();
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      ClickSound();
      onPageChange(currentPage + 1);
    }
  };

  const itemsPerPage = 6;

  const emptyItems = Array(itemsPerPage - items.length).fill({ type: 'empty', name: 'empty', price: 0 });

  const displayItems = [...items, ...emptyItems];

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
        {displayItems.map((item, index) => (
          <MenuItem
            key={`${item.type}-${item.name}-${index}`} 
            item={item}
            onSelect={() => item.type !== 'empty' && setSelectedItem(item)}
            isBest={selectedCategory === '추천메뉴' && item.type !== 'empty'}
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
            opacity: currentPage === totalPages - 1 ? 0.2 : 1,
            transition: 'opacity 0.3s ease' 
          }} 
        />
      </button>

      {selectedItem && selectedItem.type === 'bread' && (
        <BreadModal
          item={selectedItem}
          onClose={() =>{
            ClickSound();
            setSelectedItem(null);
          }}
          onAddToCart={onAddToCart}
        />
      )}

      {selectedItem && selectedItem.type === 'coffee' && (
        <CoffeeModal
          item={selectedItem}
          onClose={() =>{
            ClickSound();
            setSelectedItem(null);
          }}
          onAddToCart={onAddToCart}
          additionalOptions={additionalOptions}
        />
      )}
    </div>
  );
};

export default MenuList;