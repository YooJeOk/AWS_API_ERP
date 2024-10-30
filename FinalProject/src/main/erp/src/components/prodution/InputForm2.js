import React, { useState } from 'react';
import axios from 'axios';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            entryDate: '',
            orderID: '',
            productID: '',
            productName: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData[0]);
            const response = await axios.post('http://localhost:8080/api/production-entry/create', formData[0]); 
            console.log(response);
            if (response.status === 200) {
                console.log("데이터 전송 성공:", response.data);
                alert("등록이 완료되었습니다!");
            } else {
                console.error("데이터 전송 실패:", response.status);
                alert("등록 실패, 상태 코드: " + response.status);
            }
        } catch (error) {
            console.error("서버와의 통신 중 오류 발생:", error);
            alert("서버 오류 발생: " + error.message);
        }
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
                                    <tr key={index}><td>
                                        <input type="datetime-local" name="entryDate"
                                            value={row.entryDate}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                            style={{ width: '100%' }}
                                        />
                                    </td><td>
                                        <input
                                            type="text"
                                            name="orderID"
                                            value={row.orderID}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                            style={{ width: '100%' }}
                                        />
                                    </td><td>
                                        <input
                                            type="text"
                                            name="productID"
                                            value={row.productID}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                            style={{ width: '100%' }}
                                        />
                                    </td><td>
                                        <input
                                            type="text"
                                            name="productName"
                                            value={row.productName}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                            style={{ width: '100%' }}
                                        />
                                    </td><td>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={row.quantity}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                            style={{ width: '100%' }}
                                        />
                                    </td><td>
                                        <input
                                            type="text"
                                            name="etc"
                                            value={row.etc}
                                            onChange={(e) => handleChange(index, e)}
                                            style={{ width: '100%' }}
                                        />
                                    </td></tr>
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
