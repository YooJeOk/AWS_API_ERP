import React from 'react';
import { useNavigate } from 'react-router-dom';
import './earn.css';
import OrderSummary from '../../components/Kiosk/OrderSummary';

const EarnPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    // 취소 로직 구현
    navigate('/');
  };

  return (
    <div className="detail-page container-md body-center">
      <nav className="detail-header text-bold">적립하시겠습니까?</nav>
      <div className="earn-content">
        <div className="earn-guide fs-4">
          회원이 아니시라면 [회원가입]을, 적립을 원하지 않으시면 결제를 진행해주세요
        </div>
        <div className="earn-process mt-3">
          <div className="phone-check">
            <img src="images/join/phone.png" alt="Phone check" />
            <div className="mt-3 fs-4">번호조회</div>
          </div>
          <div className="join-member">
            <img src="images/join/join.png" alt="Join member" />
            <div className="mt-3 fs-4">회원가입</div>
          </div>
        </div>     
      </div>
      <OrderSummary 
        orderAmount={7500}
        discountAmount={0}
        totalAmount={7500}
        onCancel={handleCancel}
        previousPath="/detail"
        nextPath="/payment"
      />
    </div>
  );
};

export default EarnPage;