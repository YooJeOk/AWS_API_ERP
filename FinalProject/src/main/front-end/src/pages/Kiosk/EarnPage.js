import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './earn.css';
import OrderSummary from '../../components/Kiosk/OrderSummary';
import KeypadModal from '../../components/Kiosk/KeypadModal';

const EarnPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadPurpose, setKeypadPurpose] = useState('');

  const cartItems = location.state?.cartItems || [];
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCancel = () => {
    navigate('/');
  };

  const handlePrevious = () => {
    navigate('/detail', { state: { cartItems } });
  };

  const handlePhoneCheck = () => {
    setKeypadPurpose('phoneCheck');
    setShowKeypad(true);
  };

  const handleJoinMember = () => {
    setKeypadPurpose('joinMember');
    setShowKeypad(true);
  };

  const handleKeypadClose = () => {
    setShowKeypad(false);
  };


  const handleKeypadSubmit = (number) => {
    console.log(`Submitted number for ${keypadPurpose}:`, number);
    if (keypadPurpose === 'joinMember') {
      console.log('회원가입이 완료되었습니다.');
    }
    setShowKeypad(false);
  };
  return (
    <div className="detail-page container-md body-center">
      <nav className="detail-header text-bold">적립하시겠습니까?</nav>
      <div className="earn-content">
        <div className="earn-guide fs-4">
          회원이 아니시라면 [회원가입]을, 적립을 원하지 않으시면 결제를 진행해주세요
        </div>

        <div className="earn-process mt-3">
          <div className="phone-check" onClick={handlePhoneCheck}>
            <img src="images/join/phone.png" alt="Phone check" />
            <div className="mt-3 fs-4">번호조회</div>
          </div>
          <div className="join-member" onClick={handleJoinMember}>
            <img src="images/join/join.png" alt="Join member" />
            <div className="mt-3 fs-4">회원가입</div>
          </div>
        </div>     
      </div>
      <OrderSummary 
        orderAmount={totalAmount}
        discountAmount={0}
        totalAmount={totalAmount}
        onCancel={handleCancel}
        onPrevious={handlePrevious}
        nextPath="/payment"
      />
      {showKeypad && (
        <KeypadModal
          onClose={handleKeypadClose}
          onSubmit={handleKeypadSubmit}
          purpose={keypadPurpose}
        />
      )}
    </div>
  );
};

export default EarnPage;