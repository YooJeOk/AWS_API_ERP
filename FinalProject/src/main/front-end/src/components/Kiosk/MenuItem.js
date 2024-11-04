import React from 'react';
import useClickSound from '../../hooks/useClickSound';


const MenuItem = ({ item, onSelect, isBest }) => {
  const ClickSound = useClickSound(); 

  const handleClick = () => {
    ClickSound(); 
    onSelect(); 
  };

  return (
    <div className="menu-item text-center text-bold" onClick={handleClick}>
      <div className="item-front">
        {isBest && <div className="best-label">Best</div>}
        <img className="item-photo" src={item.image} alt={item.name} />
        <div id="item-name">{item.name}</div>
        <span className="won">₩</span><span id="item-price" className="item-price">{item.price}</span>
      </div>
    </div>
  );
};

export default MenuItem;