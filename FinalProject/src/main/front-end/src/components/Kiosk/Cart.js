import React from 'react';
import { DashSquare, PlusSquare, XLg } from 'react-bootstrap-icons';
import {useNavigate } from 'react-router-dom';

const Cart = ({ items, updateQuantity, removeItem, clearCart }) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detail', { state: { cartItems: items } });
  };

  return (
    <div className="menu-pay-container container-md cart-fixed">
      <div id="cartContainer" className="cart fs-4 p-2 px-3">
        {items.map((item, index) => (
          <div key={index} className="cart-item space-btw">
            <div className="cart-name w-50 text-left">
              {item.type === 'coffee' ? `(${item.temperature}) ${item.name}` : item.name}
            </div>
            <div className="cart-counter w-25 text-right">
              <button
                className="cart-decrease cart-counter-btn"
                onClick={() => updateQuantity(item.id, item.options, item.quantity - 1)}
                disabled={item.quantity === 1}
              ><DashSquare />

              </button>
              <span className="cart-count">{item.quantity}</span>
              <button
                className="cart-increase cart-counter-btn"
                onClick={() => updateQuantity(item.id, item.options, item.quantity + 1)}
              ><PlusSquare /></button>
            </div>
            <div className="cart-price w-25 text-right mb-3">
              ₩{item.totalPrice}
            </div>
            <button type="button" className="cart-cancel" onClick={() => removeItem(index)}>
              <XLg />
            </button>
          </div>
        ))}
      </div>
      <div className="pay">
        <div className="order-contianer fs-5">
          <div className="space-btw">
            <div>주문수량</div>
            <div>{totalQuantity}개</div>
          </div>
          <hr className="pay-boundary" />
          <div className="space-btw">
            <div>주문금액</div>
            <div>{totalAmount}원</div>
          </div>
        </div>
        <div className="pay-btn-container fs-5">
          <button type="button" className="btn-basic btn-cancle" onClick={clearCart}>전체 취소</button>
          <button type="button" className="btn-basic btn-pay"  onClick={handleClick}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;