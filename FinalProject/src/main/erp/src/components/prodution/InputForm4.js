import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './production.css';

function MBOMForm() {
    const [productOptions, setProductOptions] = useState([]);
    const [formData, setFormData] = useState([
        {
            productId: '',
            productName: '',
            quantity: '',
            startDate: '',
            endDate: '',
            priority: '',
            etc: ''
        }
    ]);

    useEffect(() => {
        const fetchProductOptions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products'); // 서버 API 엔드포인트
                if (response.status === 200) {
                    setProductOptions(response.data);
                } else {
                    console.error('상품 데이터를 불러오는데 실패했습니다:', response.status);
                }
            } catch (error) {
                console.error('서버로부터 상품 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchProductOptions();
    }, []);

    const handleProductNameChange = (index, value) => {
        const selectedProduct = productOptions.find((option) => option.productName === value);
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            productName: value,
            productId: selectedProduct ? selectedProduct.productId : ''
        };
        setFormData(newFormData);
    };

    const handleChange = (index, e) => {
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            [e.target.name]: e.target.value
        };
        setFormData(newFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/workorders', formData[0]);

            if (response.status === 200) {
                console.log('생산 주문이 성공적으로 등록되었습니다:', response.data);
                setFormData([
                    {
                        productId: '',
                        productName: '',
                        quantity: '',
                        startDate: '',
                        endDate: '',
                        priority: '',
                        etc: ''
                    }
                ]);
            } else {
                console.error('생산 주문 등록 실패:', response.status);
            }
        } catch (error) {
            console.error('서버로 데이터 전송 중 오류 발생:', error);
        }
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar" style={{ marginBottom: '20px' }}>
                        <h1 className="custom-padding">생산 주문 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <table className="table production-table" style={{ marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>생산 품목 ID</th>
                                    <th>제품명</th>
                                    <th>생산 수량</th>
                                    <th>생산 날짜 및 시간</th>
                                    <th>납기 날짜 및 시간</th>
                                    <th>우선순위</th>
                                    <th>기타 사항</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                name="productId"
                                                value={row.productId}
                                                readOnly
                                                disabled
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name="productName"
                                                value={row.productName}
                                                onChange={(e) => handleProductNameChange(index, e.target.value)}
                                                required
                                            >
                                                <option value="">선택</option>
                                                {productOptions.map((option) => (
                                                    <option key={option.productName} value={option.productName}>
                                                        {option.productName}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td><input type="text" name="quantity" value={row.quantity} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="datetime-local" name="startDate" value={row.startDate} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="datetime-local" name="endDate" value={row.endDate} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="priority" value={row.priority} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="etc" value={row.etc} onChange={(e) => handleChange(index, e)} /></td>
                                    </tr>
                                ))}
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
