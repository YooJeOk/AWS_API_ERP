import React, { useState } from 'react';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            productionDate: '',
            productionCalculation: '',
            productionPeriod: '',
            baseItem: '',
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
        console.log('품질검사 등록 데이터:', formData);
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar" style={{ marginBottom: '20px' }}>
                        <h1>품질검사 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <table className="production-table" style={{ marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>검사 일자</th>
                                    <th>검사 방법</th>
                                    <th>품목 코드</th>
                                    <th>품목명</th>
                                    <th>수량</th>
                                    <th>시료</th>
                                    <th>합격 여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="datetime-local"
                                                name="productionDate"
                                                value={row.productionDate}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                                step="1800" // 30분 단위 설정
                                            />
                                        </td>
                                        <td><input type="text" name="productionCalculation" value={row.productionCalculation} onChange={(e) => handleChange(index, e)} required /></td>
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
