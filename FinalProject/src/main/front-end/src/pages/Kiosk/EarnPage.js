import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './earn.css';
import OrderSummary from '../../components/Kiosk/OrderSummary';
import KeypadModal from '../../components/Kiosk/KeypadModal';
import useClickSound from '../../hooks/useClickSound';
import useTTS from '../../hooks/useTTS';
import AlertModal from '../../components/Kiosk/AlertModal';

const EarnPage = () => {
  const ClickSound = useClickSound();
  const playTTS = useTTS(); 

  const navigate = useNavigate();
  const location = useLocation();
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadPurpose, setKeypadPurpose] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const cartItems = location.state?.cartItems || [];
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const [userData, setUserData] = useState(null);

  const handleCancel = () => {
    ClickSound();
    navigate('/');
  };

  const handlePrevious = () => {
    ClickSound();
    playTTS("주문 세부내역을 다시 확인해주세요")
    navigate('/detail', { state: { cartItems ,userData} });
  };
  const handleNext = async () => {
    ClickSound();
    playTTS("결제 방식을 선택해주세요")
    try {
      navigate('/payment', { state: { cartItems, userData } });
    } catch (error) {
      console.error("Failed to play TTS message:", error);
    }
  };

  useEffect(() => {
    if (location.state?.userData) {
      setUserData(location.state.userData);
    }
  }, [location.state]);

  const handlePhoneCheck = () => {
    ClickSound();
    playTTS('번호를 입력해주세요');
    setKeypadPurpose('phoneCheck');
    setShowKeypad(true);
  };

  const handleJoinMember = () => {
    ClickSound();
    playTTS('번호를 입력해주세요');
    setKeypadPurpose('joinMember');
    setShowKeypad(true);
  };

  const handleKeypadClose = () => {
    ClickSound();
    setShowKeypad(false);
  };

  const handleKeypadSubmit = async (number) => {
    ClickSound();
    if (keypadPurpose === 'phoneCheck') {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${number}`);
        if (!response.ok) {
          throw new Error('Number not found');
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
        // alert('조회된 번호가 없습니다.');
        setAlertMessage('조회된 번호가 없습니다.');
        setShowAlert(true);
      }
    } else if (keypadPurpose === 'joinMember') {
      console.log("회원가입완료");
    }
    setShowKeypad(false);
  };
  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR');
  };
  return (
    <div className="detail-page container-md body-center">
      <nav className="detail-header text-bold">적립을 선택해주세요</nav>
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
        {userData && (
          <table className="table user-data-table">
            <thead>
              <tr>
                <th>전화번호</th>
                <th>스탬프</th>
                <th>쿠폰</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.phone}</td>
                <td>{userData.stamp}</td>
                <td>{userData.coupon}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <OrderSummary
        orderAmount={formatPrice(totalAmount)}
        discountAmount={0}
        totalAmount={formatPrice(totalAmount)}
        onCancel={handleCancel}
        onPrevious={handlePrevious}
        onNext={handleNext}
        nextPath="/payment"
      />
      {showKeypad && (
        <KeypadModal
          onClose={handleKeypadClose}
          onSubmit={handleKeypadSubmit}
          purpose={keypadPurpose}
        />
      )}
        {showAlert && (
        <AlertModal 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
        />
      )}
    </div>
  );
};

export default EarnPage;
