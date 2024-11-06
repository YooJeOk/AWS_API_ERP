import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.css';
import OrderSummary from '../../components/Kiosk/OrderSummary';
import PaymentModal from '../../components/Kiosk/PaymentModal';

import axios from 'axios';
import CouponModal from '../../components/Kiosk/CouponModal';
import useClickSound from '../../hooks/useClickSound';
import useTTS from '../../hooks/useTTS';

const PaymentPage = () => {
  const playTTS = useTTS(); 
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const userData = location.state?.userData || null;
  const ClickSound = useClickSound();

  const [discountAmount, setDiscountAmount] = useState(0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showCouponModal, setShowCouponModal] = useState(false);


  useEffect(() => {
    // 포트원 스크립트 로드
    const portOneScript = document.createElement('script');
    portOneScript.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.body.appendChild(portOneScript);

    // 네이버페이 스크립트 로드
    const naverPayScript = document.createElement('script');
    naverPayScript.src = "https://nsp.pay.naver.com/sdk/js/naverpay.min.js";
    naverPayScript.onload = () => console.log('Naver Pay script loaded');
    document.body.appendChild(naverPayScript);

    return () => {
      document.body.removeChild(portOneScript);
      document.body.removeChild(naverPayScript);
    };
  }, []);



  const handleCancel = () => {
    ClickSound();
    navigate('/');
  };

  const handlePrevious = () => {
    playTTS("적립을 선택해주세요")
    ClickSound();
    navigate('/earn', { state: { cartItems, userData } });
  };

  const handlePaymentClick = async (paymentType) => {
    ClickSound();
    if (paymentType === '네이버페이') {
      playTTS("네이버페이를 선택하셨습니다.");

      sessionStorage.setItem('paymentData', JSON.stringify({
        cartItems,
        totalAmount,
        discountAmount,
        userData
      }));
       // 임시 주문 ID 생성 (실제로는 서버에서 생성하는 것이 좋습니다)
    const tempOrderId = 'ORDER_' + Date.now();
      if (window.Naver) {
        const oPay = window.Naver.Pay.create({
          mode: "development",
          clientId: "HN3GGCMDdTgGUfl0kFCo",
          chainId: "M3ZnVnhIK3hzWkd",
        });

        oPay.open({
          merchantUserKey: "np_jeihb592280",
          merchantPayKey: "20241028cQ1px5",
          productName: "Kiosk Order Payment",
          totalPayAmount: totalAmount - discountAmount,
          taxScopeAmount: totalAmount - discountAmount,
          taxExScopeAmount: "0",
          returnUrl: `http://localhost:3001/payment-complete?orderId=${tempOrderId}`,        
        });
      }
    }else {
      if (paymentType === "카카오페이") {
        playTTS("카카오페이를 선택하셨습니다.");
      } else {
        playTTS("토스페이를 선택하셨습니다.");
      }
      const { IMP } = window;
      IMP.init('imp71261721');
      IMP.request_pay({
        pg: paymentType === '카카오페이' ? 'kakaopay' : 'tosspay',
        pay_method: 'card',
        amount: totalAmount - discountAmount,
        name: 'Kiosk Order Payment',
      }, async (response) => {
        if (response.success) {
          handlePaymentSuccess(paymentType);
        } else {
          handlePaymentFailure(response.error_msg);
        }
      });
    }

  };


  const handlePaymentSuccess = async (paymentType) => {
    setModalMessage(`${paymentType} 결제가 완료되었습니다.`);
    setShowModal(true);
    try {
      const saleData = {
        salesRecords: {
          paymentType,
          totalSalePrice: totalAmount - discountAmount,
          orderAmount: totalAmount,
          discountAmount,
        },
        cartItems: cartItems.map(item => ({
          productId: item.type === 'bread' ? item.id : null,
          coffeeId: item.type === 'coffee' ? item.id : null,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          type: item.type,
          options: item.type === 'coffee' ? {
            temperature: item.temperature,
            size: item.options.size,
            sizeCharge: item.options.sizeCharge,
            additionalOptions: item.options.additionalOptions.map(option => ({
              id: option.id,
              name: option.name,
              quantity: option.quantity,
              price: option.price,
            }))
          } : null,
        })),
        userData,
      };


      // 재고 업데이트 요청
      await axios.post('/api/inventory/update', {
        cartItems: saleData.cartItems.map(item => ({
          id: item.productId || item.coffeeId,
          type: item.type,
          quantity: item.quantity,
          options: item.options
        }))
      });

      console.log('Sending data to server:', JSON.stringify(saleData, null, 2));
      const response = await axios.post('/api/sales', saleData);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error("판매 기록 저장 실패", error.response ? error.response.data : error.message);
    }
  };

  const handlePaymentFailure = (errorMessage) => {
    setModalMessage(`결제가 실패하였습니다: ${errorMessage}`);
    setShowModal(true);
  };

  const handleStampCouponClick = () => {
    ClickSound();
    if (!userData || userData.coupon === 0) {
      playTTS("보유한 쿠폰의 개수가 없습니다.")
      setModalMessage('보유한 쿠폰의 개수가 없습니다.');
      setShowModal(true);
    } else {
      playTTS("쿠폰을 사용하시겠습니까?")
      setModalMessage(`쿠폰을 사용하시겠습니까?\n보유한 쿠폰 개수: ${userData.coupon}`);
      setShowCouponModal(true);
    }
  };

  const handleCouponUse = (useIt) => {
    if (useIt) {
      setDiscountAmount(1500);
    } else {
      setDiscountAmount(0);
    }
    setShowCouponModal(false);
  };

  const closeModal = () => {
    ClickSound();
    setShowModal(false);
    navigate('/'); 
  };
  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR');
  };


  return (
    <div className="detail-page container-md body-center">
      <nav className="detail-header text-bold">결제방식을 선택해 주세요</nav>
      <div className="payment-content">
        <div className="payment-text fs-4 px-1">카드 결제</div>

        <div className="payment-category mt-2 fs-5 text-bold">
          <div className="naver-payment" onClick={() => { handlePaymentClick('네이버페이') }}>
            <svg viewBox="0 0 277 105" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M224.585 0C253.528 0 277 23.51 277 52.5C277 81.49 253.528 105 224.585 105H52.4148C23.4719 105 0 81.49 0 52.5C0 23.51 23.4719 0 52.4148 0H224.585Z" fill="#00DE5A" />
              <path d="M52.5013 90.5599C31.4813 90.5599 14.4414 73.5199 14.4414 52.4999C14.4414 31.4799 31.4813 14.4399 52.5013 14.4399C73.5213 14.4399 90.5614 31.4799 90.5614 52.4999C90.5714 73.5199 73.5313 90.5599 52.5013 90.5599ZM59.8513 33.4599V54.39L45.1414 33.4599H33.4713V71.52H45.1614V50.59L59.8713 71.52H71.5414V33.4599H59.8513Z" fill="black" />
              <path d="M118.99 82.0199V66.0899V82.0199ZM240.91 28.3199L229.63 54.1799L217.17 28.3199H205.79L224.65 65.0199L217.07 82.0199H227.82L251.65 28.3199H240.91ZM189.92 69.4699H200.11V28.3099H189.92V31.6899C186.42 28.8699 182.46 27.3999 177.66 27.3999C166.07 27.3999 156.99 36.9199 156.99 48.8799C156.99 60.8399 166.07 70.3599 177.66 70.3599C182.46 70.3599 186.42 68.8899 189.92 66.0699V69.4699ZM179.14 62.0299C172.32 62.0299 167.19 56.3899 167.19 48.8999C167.19 41.4099 172.33 35.7699 179.14 35.7699C185.95 35.7699 191.09 41.4099 191.09 48.8999C191.1 56.3799 185.96 62.0299 179.14 62.0299ZM119.13 66.2899C122.56 68.9799 126.4 70.3799 131.03 70.3799C142.62 70.3799 151.7 60.8599 151.7 48.8999C151.7 36.9399 142.62 27.4199 131.03 27.4199C126.23 27.4199 122.27 28.8899 118.77 31.7099V28.3299H108.58V82.0299H119.12V66.2899H119.13ZM117.6 48.8999C117.6 41.4099 122.74 35.7699 129.55 35.7699C136.36 35.7699 141.5 41.4099 141.5 48.8999C141.5 56.3899 136.36 62.0299 129.55 62.0299C122.74 62.0299 117.6 56.3799 117.6 48.8999Z" fill="black" />
            </svg>
            <div>네이버페이</div>
          </div>
          <div className="kakao-payment" onClick={() => { handlePaymentClick('카카오페이') }}>
            <img src="images/payIcon/kakao.png" alt="Kakao Pay" />
            <div>카카오페이</div>
          </div>
          <div className="toss-payment" onClick={() => { handlePaymentClick('토스페이') }}>
            <img src="images/payIcon/toss12.webp" alt="Toss Pay" />
            <div>토스페이</div>
          </div>
        </div>
        <div className="stamp-container">
          <div className="stamp-text fs-4 px-1 mt-3">스탬프 사용</div>
          <div className="stamp-button mt-2 fs-5 text-bold" onClick={handleStampCouponClick}>
            <img src="images/payIcon/stamp.png" alt="Stamp" />
            <div>스탬프</div>
            <div>쿠폰 결제</div>
          </div>
        </div>
      </div>
      {showModal && <PaymentModal message={modalMessage} onClose={closeModal} />}
      {showCouponModal && (
        <CouponModal
          message={modalMessage}
          onClose={() => setShowCouponModal(false)}
          onConfirm={() => handleCouponUse(true)}
          onCancel={() => handleCouponUse(false)}
        />
      )}

      <OrderSummary
        orderAmount={formatPrice(totalAmount)}
        discountAmount={formatPrice(discountAmount)}
        totalAmount={formatPrice(totalAmount - discountAmount)}
        onCancel={handleCancel}
        onPrevious={handlePrevious}
        nextPath="/"
        showNextButton={false}
      />

    </div>
  );
};

export default PaymentPage;
