import React from 'react';
import { useNavigate } from 'react-router-dom';
import './detail.css';
import OrderSummary from '../../components/Kiosk/OrderSummary';

const DetailPage = () => {
    const navigate = useNavigate();
  
    const handleCancel = () => {
      // 취소 로직 구현
      navigate('/');
    };
  
    return (
      <div className="detail-page container-md body-center">
        <nav className="detail-header text-bold">주문 세부내역을 다시 확인해주세요</nav>
        <div className="detail-content">
          <div className="detail-item space-btw fs-4">
            <div>1. 아메리카노</div>
            <div>
              <span>1개</span>
              <span>1500원</span>
            </div>
          </div>
        </div>
        <OrderSummary 
          orderAmount={7500}
          discountAmount={0}
          totalAmount={7500}
          onCancel={handleCancel}
          previousPath="/kioskMenu"
          nextPath="/earn"
        />
      </div>
    );
  };
  
  export default DetailPage;