import React from 'react';
import './PaymentModal.css'; 
const PaymentModal = ({ message, onClose }) => {
  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-content">
        <p>{message}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default PaymentModal;