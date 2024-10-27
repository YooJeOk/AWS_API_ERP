import React from 'react';



const MenuItem = ({ item, onSelect, isBest }) => {
  const playClickSound = () => {
    const audio = new Audio('/sounds/mouth-bass.mp3'); 
    audio.play().catch(error => {
      console.error("Failed to play click sound:", error);
    });
  };

  const handleClick = () => {
    playClickSound(); 
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