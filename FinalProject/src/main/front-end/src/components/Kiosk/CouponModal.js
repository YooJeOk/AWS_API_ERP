import React from 'react';
import './CouponModal.css';

const CouponModal = ({ message, onClose, onConfirm, onCancel }) => {
    return (
        <div className="coupon-modal-overlay">
            <div className="coupon-modal">
                <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
                <div className="coupon-modal-buttons">
                    <button onClick={onConfirm}>예</button>
                    <button onClick={onCancel}>아니오</button>
                </div>
                {/* <button className="close-button" onClick={onClose}>×</button> */}
            </div>
        </div>
    );
};

export default CouponModal;