// components/Kiosk/AlertModal.js
import React from 'react';
import './AlertModal.css';

const AlertModal = ({ message, onClose }) => {
  return (
    <div className="coupon-modal-overlay">
      <div className="coupon-modal">
      <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
      <div className="coupon-modal-buttons mt-4">
      <button className='demo-btn'  onClick={onClose}>확인</button>
      </div>
      </div>
    </div>
  );
};

export default AlertModal;
