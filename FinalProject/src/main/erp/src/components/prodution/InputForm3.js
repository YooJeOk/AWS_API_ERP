import React, { useState } from 'react';
import axios from 'axios';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            orderId: '',           // 주문 ID
            productId: '',          // 제품 ID
            startDate: '',          // 시작 시간
            endDate: '',            // 종료 시간
            etc: ''                 // 기타사항
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('생산 계획 등록 데이터:', formData);
    
        try {
            // formData 자체를 배열로 전송
            const response = await axios.post('http://localhost:8080/api/production-planning/create', formData);
            if (response.status === 200) {
                alert("생산 계획이 성공적으로 저장되었습니다.");
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
                        <h1>생산 계획 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <table className="production-table" style={{ marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>주문 ID</th>
                                    <th>제품 ID</th>
                                    <th>시작 시간</th>
                                    <th>종료 시간</th>
                                    <th>기타사항</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((row, index) => (
                                    <tr key={index}>
                                        <td><input type="text" name="orderId" value={row.orderId} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="text" name="productId" value={row.productId} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="datetime-local" name="startDate" value={row.startDate} onChange={(e) => handleChange(index, e)} required /></td>
                                        <td><input type="datetime-local" name="endDate" value={row.endDate} onChange={(e) => handleChange(index, e)} required /></td>
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
