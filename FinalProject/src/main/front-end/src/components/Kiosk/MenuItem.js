import React from 'react';

const MenuItem = ({ item, onSelect }) => {
  return (
    <div className="menu-item text-center text-bold" onClick={onSelect}>
      <div className="item-front">
        <img className="item-photo" src={item.image} alt={item.name} />
        <div id="item-name">{item.name}</div>
        <span className="won">₩</span><span id="item-price" className="item-price">{item.price}</span>
      </div>
    </div>
  );
};

export default MenuItem;