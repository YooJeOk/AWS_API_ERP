import React, { useState } from 'react';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            productionDate: '',
            productionPeriod: '',
            baseItem: '',
            productionCalculation: '',
            mrpCalculation: '',
            status: '',
            others: ''
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
        console.log('생산 내역 등록 데이터:', formData);
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar" style={{ marginBottom: '20px' }}>
                        <h1>생산 내역 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <table className="production-table" style={{ marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>생산 일자</th>
                                    <th>생산 품목 코드</th>
                                    <th>생산 품목명</th>
                                    <th>생산 수량</th>
                                    <th>사용 원재료</th>
                                    <th>기타사항</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((row, index) => (
                                    <tr key={index}>
                                        <td><input type="datetime-local" name="productionDate" value={row.productionDate} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="productionPeriod" value={row.productionPeriod} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="baseItem" value={row.baseItem} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="mrpCalculation" value={row.mrpCalculation} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="status" value={row.status} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="others" value={row.others} onChange={(e) => handleChange(index, e)} /></td>
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
