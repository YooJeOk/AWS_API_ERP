import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './detail.css';
import OrderSummary from '../../components/Kiosk/OrderSummary';

const DetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];
    const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  
    const handleCancel = () => {
      navigate('/');
    };
  
    return (
      <div className="detail-page container-md body-center">
        <nav className="detail-header text-bold">주문 세부내역을 다시 확인해주세요</nav>
        <div className="detail-content">
          {cartItems.map((item, index) => (
            <div key={index} className="detail-item space-btw fs-4">
              <div>
                <div>{index + 1}. {item.name} {item.type === 'coffee' && `(${item.temperature})`}</div>
                {item.options && item.options.size && (
                  <div className="item-option">- 사이즈: {item.options.size}</div>
                )}
                {item.options && item.options.additionalOptions && item.options.additionalOptions.map((option, optIndex) => (
                  <div key={optIndex} className="item-option">
                    - {option.name}: {option.quantity}개
                  </div>
                ))}
              </div>
              <div>
                <span>{item.quantity}개</span>
                <span className="item-price">{item.totalPrice}원</span>
              </div>
            </div>
          ))}
        </div>
        <OrderSummary 
          orderAmount={totalAmount}
          discountAmount={0}
          totalAmount={totalAmount}
          onCancel={handleCancel}
          previousPath="/kioskMenu"
          nextPath="/earn"
        />
      </div>
    );
  };
  
  export default DetailPage;