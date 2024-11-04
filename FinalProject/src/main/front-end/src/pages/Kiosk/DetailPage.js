import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './detail.css';
import OrderSummary from '../../components/Kiosk/OrderSummary';
import useClickSound from '../../hooks/useClickSound';
import useTTS from '../../hooks/useTTS';

const DetailPage = () => {
  const ClickSound = useClickSound();
  const playTTS = useTTS(); 

  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCancel = () => {
    ClickSound();
    navigate('/');
  };

  const handlePrevious = () => {
    playTTS("메뉴를 선택해주세요")
    ClickSound();
    navigate('/kioskMenu', { state: { cartItems } });
  };

  const handleNext = async () => {
    playTTS("적립을 선택해주세요")
    ClickSound();
    try {
      navigate('/earn', { state: { cartItems} });
    } catch (error) {
      console.error("Failed to play TTS message:", error);
    }
  };
  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR');
  };
  return (
    <div className="detail-page container-md body-center">
      <nav className="detail-header text-bold">주문 세부내역을 다시 확인해주세요</nav>
      <div className="detail-content">
        {cartItems.map((item, index) => (
          <div key={index} className="detail-item row fs-4">
            <div className='col-3 detail-item-image-container'>
              <img src={item.image} alt={item.name} className="detail-item-image col-3" />
            </div>
            <div className='col-6 mt-3'>
              <div>{index + 1}. {item.name} {item.type === 'coffee' && `(${item.temperature})`}</div>
              {item.options && item.options.size && (
                <div className="item-option fs-5">ㄴ 사이즈: {item.options.size}</div>
              )}
              {item.options && item.options.additionalOptions && item.options.additionalOptions.map((option, optIndex) => (
                <div key={optIndex} className="item-option fs-5">
                 ㄴ {option.name} (x{option.quantity})
                </div>
              ))}
            </div>
            <div className='col-3 space-around mt-5'>
              <div>{item.quantity}개</div>
              <div className="item-price">₩{formatPrice(item.totalPrice)}</div>
            </div>
          </div>
        ))}
      </div>
      <OrderSummary
        orderAmount={formatPrice(totalAmount)}
        discountAmount={0}
        totalAmount={formatPrice(totalAmount)}
        onCancel={handleCancel}
        onPrevious={handlePrevious}
        onNext={handleNext}
        nextPath="/earn"
      />
    </div>
  );
};

export default DetailPage;