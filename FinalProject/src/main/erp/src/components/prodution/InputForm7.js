import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState({
        orderID: '',
        productID: '',
        productName: '',
        quantity: '',
        testDate: '',
        testResult: '',
        etc: ''
    });
    const [availableOrderIDs, setAvailableOrderIDs] = useState([]);

    useEffect(() => {
        const fetchAvailableOrderIDs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/workorders/uninspected');
                if (response.status === 200) {
                    setAvailableOrderIDs(response.data);
                }
            } catch (error) {
                console.error("사용 가능한 주문 ID를 가져오는 중 오류 발생:", error);
            }
        };
        fetchAvailableOrderIDs();
    }, []);

    const handleOrderIDChange = async (e) => {
        const orderID = e.target.value;
        setFormData((prevData) => ({ ...prevData, orderID }));

        if (orderID && !isNaN(orderID)) {
            try {
                const response = await axios.get(`http://localhost:8080/api/workorders/${orderID}`);
                if (response.status === 200) {
                    const { productId = '', productName = '', quantity = '' } = response.data;
                    setFormData((prevData) => ({
                        ...prevData,
                        productID: productId,
                        productName,
                        quantity
                    }));
                }
            } catch (error) {
                console.error("작업 지시 데이터 불러오기 오류:", error);
                alert("해당 주문 ID로 데이터를 불러올 수 없습니다.");
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                productID: '',
                productName: '',
                quantity: ''
            }));
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

        const postData = {
            ...formData,
            orderID: parseInt(formData.orderID, 10),
            quantity: parseInt(formData.quantity, 10),
            testDate: formData.testDate ? new Date(formData.testDate).toISOString() : ''
        };

        try {
            const response = await axios.post('http://localhost:8080/api/quality-control', postData);
            if (response.status === 200) {
                alert('품질검사가 성공적으로 등록되었습니다.');

                if (formData.testResult === '불합격') {
                    const defectData = {
                        QCID: response.data.qcid,
                        OrderID: postData.orderID,
                        Quantity: postData.quantity,
                        ProductID: postData.productID,
                        ProductName: postData.productName,
                        DefectType: '불합격',
                        DefectQuantity: postData.quantity,
                        Status: '미처리',
                        Defectrate: 0
                    };

                    
                }

                setFormData({
                    orderID: '',
                    productID: '',
                    productName: '',
                    quantity: '',
                    testDate: '',
                    testResult: '',
                    etc: ''
                });
            }
        } catch (error) {
            console.error('등록 중 에러 발생:', error);
            alert('등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar" style={{ marginBottom: '20px' }}>
                        <h1 className="custom-padding">품질검사 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <table className="table production-table" style={{ marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>주문ID</th>
                                    <th>상품ID</th>
                                    <th>상품명</th>
                                    <th>검사 수량</th>
                                    <th>검사 날짜</th>
                                    <th>검사 결과</th>
                                    <th>기타 사항</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select name="orderID" value={formData.orderID} onChange={handleOrderIDChange} required>
                                            <option value="">주문ID 선택</option>
                                            {availableOrderIDs.map((order, index) => (
                                                <option key={order.orderId || index} value={order.orderId}>
                                                    {order.orderId}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><input type="text" name="productID" value={formData.productID} readOnly required /></td>
                                    <td><input type="text" name="productName" value={formData.productName} readOnly required /></td>
                                    <td><input type="number" name="quantity" value={formData.quantity} readOnly required /></td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            name="testDate"
                                            value={formData.testDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <select name="testResult" value={formData.testResult} onChange={handleChange} required>
                                            <option value="">선택</option>
                                            <option value="합격">합격</option>
                                            <option value="불합격">불합격</option>
                                        </select>
                                    </td>
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
