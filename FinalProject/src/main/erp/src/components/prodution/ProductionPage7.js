import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './ProductionPage.css';
import InputForm7 from './InputForm7';

function Production7() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/quality-control'); // 품질 관리 데이터 엔드포인트
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                console.error("데이터를 불러오는 중 에러 발생:", error);
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
                        <h1>불량 조회</h1>
                        <button className="create-button" onClick={() => navigate('/input7')}>
                            생성
                        </button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>주문ID</th>
                                <th>상품명</th>
                                <th>검사 수량</th>
                                <th>검사 날짜</th>
                                <th>검사 결과</th>
                                <th>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((row) => (
                                    <tr key={row.QCID}>
                                        <td>{row.OrderID}</td>
                                        <td>{row.ProductName}</td>
                                        <td>{row.Quantity}</td>
                                        <td>{new Date(row.TestDate).toLocaleDateString()}</td>
                                        <td>{row.TestResult}</td>
                                        <td>{row.etc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">등록된 데이터가 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Routes>
                    <Route path="/input7" element={<InputForm7 />} />
                </Routes>
            </main>
        </div>
    );
}

export default Production7;
