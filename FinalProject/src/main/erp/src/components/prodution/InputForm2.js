import React, { useState } from 'react';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            arrivalDate: '',
            productCode: '',
            productName: '',
            specification: '',
            quantity: '',
            others: '',
            workOrder: ''
        }
    ]);

    const handleChange = (index, e) => {
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            [e.target.name]: e.target.value
        };
        setFormData(newFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('입고 등록 데이터:', formData);
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>생산 입고 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit}>
                        <table className="production-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>입고 일자</th>
                                    <th style={{ width: '10%' }}>생산품목 코드</th>
                                    <th style={{ width: '15%' }}>생산품목명</th>
                                    <th style={{ width: '10%' }}>규격</th>
                                    <th style={{ width: '10%' }}>수량</th>
                                    <th style={{ width: '20%' }}>기타</th>
                                    <th style={{ width: '20%' }}>작업지시서</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="datetime-local"
                                                name="arrivalDate"
                                                value={row.arrivalDate}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                                step="1800" // 30분 단위 설정
                                                style={{ width: '100%' }}
                                            />
                                        </td>
                                        <td><input type="text" name="productCode" value={row.productCode} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="productName" value={row.productName} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="specification" value={row.specification} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="quantity" value={row.quantity} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="others" value={row.others} onChange={(e) => handleChange(index, e)} style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="workOrder" value={row.workOrder} onChange={(e) => handleChange(index, e)} style={{ width: '100%' }} /></td>
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
