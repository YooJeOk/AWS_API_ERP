import React from 'react';
import { useNavigate } from 'react-router-dom';
import './payment.css';
import OrderSummary from '../../components/Kiosk/OrderSummary';

const PaymentPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="detail-page container-md body-center">
      <nav className="detail-header text-bold">결제방식을 선택해 주세요</nav>
      <div className="payment-content">
        <div className="payment-text fs-4 px-1">
          카드 결제
        </div>
        <div className="payment-category mt-2 fs-5 text-bold">
        <div className="naver-payment">
                    <svg viewBox="0 0 277 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224.585 0C253.528 0 277 23.51 277 52.5C277 81.49 253.528 105 224.585 105H52.4148C23.4719 105 0 81.49 0 52.5C0 23.51 23.4719 0 52.4148 0H224.585Z" fill="#00DE5A"/>
                        <path d="M52.5013 90.5599C31.4813 90.5599 14.4414 73.5199 14.4414 52.4999C14.4414 31.4799 31.4813 14.4399 52.5013 14.4399C73.5213 14.4399 90.5614 31.4799 90.5614 52.4999C90.5714 73.5199 73.5313 90.5599 52.5013 90.5599ZM59.8513 33.4599V54.39L45.1414 33.4599H33.4713V71.52H45.1614V50.59L59.8713 71.52H71.5414V33.4599H59.8513Z" fill="black"/>
                        <path d="M118.99 82.0199V66.0899V82.0199ZM240.91 28.3199L229.63 54.1799L217.17 28.3199H205.79L224.65 65.0199L217.07 82.0199H227.82L251.65 28.3199H240.91ZM189.92 69.4699H200.11V28.3099H189.92V31.6899C186.42 28.8699 182.46 27.3999 177.66 27.3999C166.07 27.3999 156.99 36.9199 156.99 48.8799C156.99 60.8399 166.07 70.3599 177.66 70.3599C182.46 70.3599 186.42 68.8899 189.92 66.0699V69.4699ZM179.14 62.0299C172.32 62.0299 167.19 56.3899 167.19 48.8999C167.19 41.4099 172.33 35.7699 179.14 35.7699C185.95 35.7699 191.09 41.4099 191.09 48.8999C191.1 56.3799 185.96 62.0299 179.14 62.0299ZM119.13 66.2899C122.56 68.9799 126.4 70.3799 131.03 70.3799C142.62 70.3799 151.7 60.8599 151.7 48.8999C151.7 36.9399 142.62 27.4199 131.03 27.4199C126.23 27.4199 122.27 28.8899 118.77 31.7099V28.3299H108.58V82.0299H119.12V66.2899H119.13ZM117.6 48.8999C117.6 41.4099 122.74 35.7699 129.55 35.7699C136.36 35.7699 141.5 41.4099 141.5 48.8999C141.5 56.3899 136.36 62.0299 129.55 62.0299C122.74 62.0299 117.6 56.3799 117.6 48.8999Z" fill="black"/>
                        </svg>
                    <div className="">네이버페이</div>
                </div>
          <div className="kakao-payment">
            <img src="images/payIcon/kakao.png" alt="Kakao Pay" />
            <div>카카오페이</div>
          </div>                
          <div className="toss-payment">
            <img src="images/payIcon/toss12.webp" alt="Toss Pay" />
            <div>토스페이</div>
          </div>
        </div>
        <div className="stamp-container">
          <div className="stamp-text fs-4 px-1 mt-3">스탬프 사용</div>
          <div className="stamp-button mt-2 fs-5 text-bold">
            <img src="images/payIcon/stamp.png" alt="Stamp" />
            <div>스탬프</div>
            <div>쿠폰 결제</div>
          </div>
        </div>     
      </div>
      <OrderSummary 
        orderAmount={7500}
        discountAmount={0}
        totalAmount={7500}
        onCancel={handleCancel}
        previousPath="/earn"
        nextPath="/"
        showNextButton={false}
      />
    </div>
  );
};

export default PaymentPage;