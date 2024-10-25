import React, { useState } from 'react';

const BreadModal = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const totalPrice = item.price * quantity
    console.log("아이템이름:"+item.name)
    console.log("아이템 번호:"+item.id)
    onAddToCart(item, quantity,'없음',totalPrice);
    onClose();
  };

  return (
    <div className="modal fade show" style={{display: 'block'}} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="large-border">
            <div className="small-border">
              <div className="modal-body">
                <img src={item.image} className="img-fluid modal-item-img" alt={item.name} />
                <div className="modal-title text-bold">{item.name}</div>
                <div className="modal-describe mt-4 body-center">{item.description}</div>
                <div className="counter-container mt-3 fs-3 space-btw">
                  <div className="counter">
                    <button onClick={handleDecrease} className="btn-counter">-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease} className="btn-counter">+</button>
                  </div>
                  <div className="modal-price">₩{item.price * quantity}</div>
                </div>
              </div>
              <div className="modal-footer fs-4">
                <button type="button" className="btn-basic btn-cancle" onClick={onClose}>취소</button>
                <button type="button" className="btn-basic btn-pay" onClick={handleAddToCart}>선택완료</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadModal;