import React, { useState } from 'react';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            productionItem: '',
            productionQuantity: '',
            productionDateTime: '',
            deliveryDateTime: '',
            priority: '',
            notes: ''
        }
    ]);

    // 필드 상태 업데이트
    const handleChange = (index, e) => {
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            [e.target.name]: e.target.value
        };
        setFormData(newFormData);
    };

    // 폼 제출 처리
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('생산 주문 등록 데이터:', formData);
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar" style={{ marginBottom: '20px' }}>
                        <h1>생산 주문 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <table className="production-table" style={{ marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>생산 품목</th>
                                    <th>생산 수량</th>
                                    <th>생산 날짜 및 시간</th>
                                    <th>납기 날짜 및 시간</th>
                                    <th>우선순위</th>
                                    <th>기타사항</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((row, index) => (
                                    <tr key={index}>
                                        <td><input type="text" name="productionItem" value={row.productionItem} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="productionQuantity" value={row.productionQuantity} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="datetime-local" name="productionDateTime" value={row.productionDateTime} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="datetime-local" name="deliveryDateTime" value={row.deliveryDateTime} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="priority" value={row.priority} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="notes" value={row.notes} onChange={(e) => handleChange(index, e)} /></td>
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
