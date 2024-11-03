import React, { useState, useEffect } from 'react';
import Pagination from '../../components/InventoryManage/Pagination';

const OrderComplete = () => {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchCompletedOrders(currentPage);
    }, [currentPage]);

    const fetchCompletedOrders = async (page) => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/completed?page=${page}&size=10`);
            const data = await response.json();
            setCompletedOrders(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching completed orders:', error);
        }
    };

    return (
        <div className="order-complete-container">
            <h3 className='text-center mb-5'>처리 완료된 주문 내역</h3>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>주문 번호</th>
                        <th>카테고리</th>
                        <th>제품/자재명</th>
                        <th>수량</th>
                        {/* <th>주문 유형</th> */}
                        <th>주문 날짜</th>
                        <th>처리 완료 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {completedOrders.map(order => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.category}</td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}{order.unit}</td>
                            {/* <td>{order.orderType}</td> */}
                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                            <td>{new Date(order.completedDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default OrderComplete;