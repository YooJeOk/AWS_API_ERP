import React, { useState } from 'react';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            entryDate: '',
            orderID: '',
            productID: '',
            productName: '', // 제품명 추가
            quantity: '',
            etc: ''
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
                                    <th style={{ width: '10%' }}>작업 지시ID</th>
                                    <th style={{ width: '10%' }}>제품ID</th>
                                    <th style={{ width: '15%' }}>제품명</th>
                                    <th style={{ width: '10%' }}>수량</th>
                                    <th style={{ width: '40%' }}>기타</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="datetime-local"
                                                name="entryDate"
                                                value={row.entryDate}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                                style={{ width: '100%' }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="orderID"
                                                value={row.orderID}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                                style={{ width: '100%' }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="productID"
                                                value={row.productID}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                                style={{ width: '100%' }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="productName"
                                                value={row.productName}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                                style={{ width: '100%' }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={row.quantity}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                                style={{ width: '100%' }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="etc"
                                                value={row.etc}
                                                onChange={(e) => handleChange(index, e)}
                                                style={{ width: '100%' }}
                                            />
                                        </td>
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
