import React from 'react';
import useClickSound from '../../hooks/useClickSound';
import { BagX } from 'react-bootstrap-icons';

const MenuItem = ({ item, onSelect, isBest }) => {
  const ClickSound = useClickSound(); 

  const formattedPrice = item.price ? item.price.toLocaleString('ko-KR') : '';

  const handleClick = () => {
    if (item.type !== 'empty') {
      ClickSound(); 
      onSelect(); 
    }
  };

  if (item.type === 'empty') {
    return (
      <div className="menu-item text-center text-bold empty-item">
        <div className="item-front">
          <div className='opacity-7'>준비중입니다. . .</div>
          <div>
            <BagX className='bag-x'></BagX>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-item text-center text-bold" onClick={handleClick}>
      <div className="item-front">
        {isBest && <div className="best-label">Best</div>}
        <img className="item-photo" src={item.image} alt={item.name} />
        <div id="item-name">{item.name}</div>
        <span className="won">₩</span><span id="item-price" className="item-price">{formattedPrice}</span>
      </div>
    </div>
  );
};

export default MenuItem;