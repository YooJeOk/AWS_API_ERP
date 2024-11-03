import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Pagination from '../../components/InventoryManage/Pagination';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    const fetchOrders = async (page) => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/pending?page=${page}&size=10`);
            const data = await response.json();
            setOrders(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleCheckboxChange = (orderId) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const handleCompleteOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/orders/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedOrders),
            });

            if (response.ok) {
                alert('선택한 주문이 처리 완료되었습니다.');
                fetchOrders(currentPage);
                setSelectedOrders([]);
            } else {
                alert('주문 처리에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error completing orders:', error);
            alert('주문 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="order-history-container">
            <h3 className='text-center mb-5'>미처리 주문 내역</h3>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>주문 번호</th>
                        <th>카테고리</th>
                        <th>제품/자재명</th>
                        <th>수량</th>
                        {/* <th>주문 유형</th> */}
                        <th>주문 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.orderId}>
                            <td>
                                <Form.Check className='order-history-check'
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange(order.orderId)}
                                    checked={selectedOrders.includes(order.orderId)}
                                />
                            </td>
                            <td>{order.orderId}</td>
                            <td>{order.category}</td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}{order.unit}</td>
                            {/* <td>{order.orderType}</td> */}
                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <dic className="form-right">
            <button
                className='change-save-btn'
                onClick={handleCompleteOrders}
                disabled={selectedOrders.length === 0}
            >
                선택한 주문 처리 완료
            </button>
            </dic>
            <div className='coffee-page'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

        </div>
    );
};

export default OrderHistory;