import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ 
  orderAmount, 
  discountAmount, 
  totalAmount, 
  onCancel, 
  onPrevious,
  nextPath, 
  showNextButton = true 
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="summary fs-4">
        <div className="space-btw"><span>주문금액</span><span>{orderAmount}원</span></div>
        <div className="space-btw"><span>할인금액</span><span>{discountAmount}원</span></div>
        <div className="space-btw"><span>결제금액</span><span>{totalAmount}원</span></div>
      </div>
      <div className="detail-button-container mt-3 fs-4 space-btw">
        <div className="all-cancle">
          <button type="button" className="button-cancel" onClick={onCancel}>전체취소</button>
        </div>
        <div className="pay-certain-container space-btw">
          <button className="button-previous" onClick={onPrevious}>이전</button>
          {showNextButton && (
            <button className="button-next" onClick={() => navigate(nextPath)}>다음</button>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderSummary;