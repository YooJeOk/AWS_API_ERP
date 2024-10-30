import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './ProductionPage.css';
import InputForm2 from './InputForm2';
import axios from 'axios';

function InputArrivalForm() {
    const [tableData, setTableData] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/production-entry/all');

                if (response.status === 200) {
                    console.log("Received data:", response.data); 
                    setTableData(response.data);
                } else {
                    console.error("Failed to fetch data:", response.status);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>생산 입고 등록 조회</h1>
                        <button className="create-button" onClick={() => navigate('/input2')}>
                            생성
                        </button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>입고 일자</th>
                                <th>작업 지시ID</th>
                                <th>제품ID</th>
                                <th>수량</th>
                                <th>기타</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.entryDate}</td> {/* 필드 이름 소문자로 확인 */}
                                        <td>{row.orderId}</td>
                                        <td>{row.productId}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.etc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">등록된 데이터가 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Routes>
                    <Route path="/input2" element={<InputForm2 />} />
                </Routes>
            </main>
        </div>
    );
}

export default InputArrivalForm;
