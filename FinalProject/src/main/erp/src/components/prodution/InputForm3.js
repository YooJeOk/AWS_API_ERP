import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState({
        orderId: '',       // 작업 지시ID
        productId: '',     // 제품ID
        productName: '',   // 상품명
        quantity: '',      // 수량
        startDate: '',     // 시작 시간
        endDate: '',       // 종료 시간
        etc: ''            // 기타사항
    });
    const [orderOptions, setOrderOptions] = useState([]); // 선택 가능한 OrderID 목록

    useEffect(() => {
        // 사용 가능한 OrderID 목록 가져오기
        const fetchOrders = async () => {
            try {
                const ordersResponse = await axios.get('http://localhost:8080/api/workorders/available');
                if (ordersResponse.status === 200) {
                    setOrderOptions(ordersResponse.data);
                    console.log("Order options:", ordersResponse.data); // 확인용
                }
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };
        
        fetchOrders();
    }, []);

    // OrderID 선택 시 관련 정보 불러오기 및 수정 가능하도록 설정
    const handleOrderChange = async (e) => {
        const selectedOrderId = e.target.value;
        setFormData((prevData) => ({ ...prevData, orderId: selectedOrderId }));

        try {
            const response = await axios.get(`http://localhost:8080/api/workorders/${selectedOrderId}`);
            if (response.status === 200) {
                const { productId, productName, quantity, startDate, endDate } = response.data;
                setFormData((prevData) => ({
                    ...prevData,
                    productId,
                    productName,
                    quantity,
                    startDate,
                    endDate
                }));
            }
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('생산 계획 등록 데이터:', formData);

        try {
            const response = await axios.post('http://localhost:8080/api/production-planning/create', formData);
            if (response.status === 200) {
                alert("생산 계획이 성공적으로 저장되었습니다.");
                window.location.reload(); // 페이지 새로고침
            } else {
                console.error("데이터 저장 실패:", response.status);
            }
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar" style={{ marginBottom: '20px' }}>
                        <h1 className="custom-padding">생산 계획 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <table className="table production-table" style={{ marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>작업 지시ID</th>
                                    <th>상품명</th>
                                    <th>제품 ID</th>
                                    <th>생산 수량</th>
                                    <th>생산 시작 시간</th>
                                    <th>생산 종료 시간</th>
                                    <th>기타사항</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select name="orderId" value={formData.orderId} onChange={handleOrderChange} required>
                                            <option value="">작업 지시ID 선택</option>
                                            {orderOptions.map((order) => (
                                                <option key={order.orderId} value={order.orderId}>
                                                    {order.orderId}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><input type="text" name="productName" value={formData.productName} onChange={handleChange} /></td>
                                    <td><input type="text" name="productId" value={formData.productId} onChange={handleChange} /></td>
                                    <td><input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required /></td>
                                    <td><input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required /></td>
                                    <td><input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required /></td>
                                    <td><input type="text" name="etc" value={formData.etc} onChange={handleChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" className="submit-button">등록</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default MBOMForm;
