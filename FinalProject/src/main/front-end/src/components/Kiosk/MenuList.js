import React, { useState } from 'react';
import MenuItem from './MenuItem.js';
import { CaretLeft, CaretRight } from 'react-bootstrap-icons';
import BreadModal from './BreadModal.js';
import CoffeeModal from './CoffeeModal.js';


const MenuList = ({ items =[], onAddToCart, additionalOptions}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="tab-content pt-1">
      <CaretLeft/>
      <div className="menu-container">
        {Array.isArray(items) && items.map((item) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            onSelect={() => setSelectedItem(item)}
          />
        ))}
      </div>
      <CaretRight />
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