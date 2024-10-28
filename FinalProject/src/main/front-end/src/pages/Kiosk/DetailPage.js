import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './detail.css';
import OrderSummary from '../../components/Kiosk/OrderSummary';

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);


  // const playTTS = async (message) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/tts?text=${encodeURIComponent(message)}`);
  //     if (!response.ok) {
  //       throw new Error('TTS API request failed');
  //     }
  //     const blob = await response.blob();
  //     const audioUrl = URL.createObjectURL(blob);
  //     const audio = new Audio(audioUrl);
  //     audio.play();
  //   } catch (error) {
  //     console.error("Failed to play TTS message:", error);
  //   }
  // };

  const handleCancel = () => {
    navigate('/');
  };

  const handlePrevious = () => {
    navigate('/kioskMenu', { state: { cartItems } });
  };

  const handleNext = async () => {
    try {
      // await playTTS('적립을 선택해 주세요'); 
      navigate('/earn', { state: { cartItems} });
    } catch (error) {
      console.error("Failed to play TTS message:", error);
    }
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
              <div className="item-price">₩{item.totalPrice}</div>
            </div>
          </div>
        ))}
      </div>
      <OrderSummary
        orderAmount={totalAmount}
        discountAmount={0}
        totalAmount={totalAmount}
        onCancel={handleCancel}
        onPrevious={handlePrevious}
        onNext={handleNext}
        nextPath="/earn"
      />
    </div>
  );
};

export default DetailPage;