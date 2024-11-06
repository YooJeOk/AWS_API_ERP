import React from 'react';
import './PaymentModal.css'; 
import {  useNavigate } from 'react-router-dom';

const PaymentModal = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    if (message.includes('완료되었습니다')) {
      navigate('/');
    }
  };
  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-content">
        <p>{message}</p>
        <button onClick={handleClose }>닫기</button>
      </div>
    </div>
  );
};

export default PaymentModal;