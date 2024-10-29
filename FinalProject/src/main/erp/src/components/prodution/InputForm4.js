import React, { useState } from 'react';
import axios from 'axios';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            productId: '',       // ProductID와 매칭
            quantity: '',         // Quantity와 매칭
            startDate: '',        // StartDate와 매칭
            endDate: '',          // EndDate와 매칭
            priority: '',         // Priority와 매칭
            etc: ''               // 기타사항과 매칭
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // formData 배열의 첫 번째 객체만 전송
            const response = await axios.post('http://localhost:8080/api/workorders', formData[0]);
            
            if (response.status === 200) {
                console.log('생산 주문이 성공적으로 등록되었습니다:', response.data);
                // 필요한 경우 폼 초기화
                setFormData([
                    {
                        productId: '',
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
                        <h1>생산 주문 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <table className="production-table" style={{ marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>생산 품목 ID</th>
                                    <th>생산 수량</th>
                                    <th>생산 시작 날짜 및 시간</th>
                                    <th>납기 날짜 및 시간</th>
                                    <th>우선순위</th>
                                    <th>기타 사항</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((row, index) => (
                                    <tr key={index}>
                                        <td><input type="text" name="productId" value={row.productId} onChange={(e) => handleChange(index, e)} required /></td>
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
