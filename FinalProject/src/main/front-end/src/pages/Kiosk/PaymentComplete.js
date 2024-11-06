import React, { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentCompletePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hasHandledPayment = useRef(false);

    const handleConfirm = () => {
        navigate('/');
    };

    const handlePaymentSuccess = useCallback(async (paymentType, orderId, paymentData) => {
        if (hasHandledPayment.current) return;
        hasHandledPayment.current = true;
        try {
            const { cartItems, totalAmount, discountAmount, userData } = paymentData;

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
            sessionStorage.removeItem('paymentData');
            navigate('/');

        } catch (error) {
            console.error("판매 기록 저장 실패", error.response ? error.response.data : error.message);
            navigate('/payment-failure');
        }
    }, [navigate]);

    const handlePaymentFailure = useCallback((errorMessage) => {
        if (hasHandledPayment.current) return;
        hasHandledPayment.current = true;

        console.error('결제 실패:', errorMessage);
        navigate('/payment-failure', { state: { errorMessage } });
    }, [navigate]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get('orderId');
        const resultCode = searchParams.get('resultCode');
        const storedPaymentData = JSON.parse(sessionStorage.getItem('paymentData'));

        if (resultCode === 'Success' && storedPaymentData && !hasHandledPayment.current) {
            handlePaymentSuccess('네이버페이', orderId, storedPaymentData);
        } else if (!hasHandledPayment.current) {
            handlePaymentFailure(searchParams.get('resultMessage'));
        }
    }, [location, handlePaymentSuccess, handlePaymentFailure]);

    return         <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center'
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                marginBottom: '2rem'
            }}>
                결제가 처리되었습니다.
            </h1>
            <button 
                onClick={handleConfirm}
                style={{
                    padding: '1rem 2rem',
                    fontSize: '1.5rem',
                    backgroundColor: '#D98C5F',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                확인
            </button>
        </div>
};

export default PaymentCompletePage;