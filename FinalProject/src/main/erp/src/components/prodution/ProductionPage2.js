// ProductionOrderPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './ProductionPage.css';
import InputForm2 from './InputForm2';
import axios from 'axios';

function ProductionOrderPage() {
    const [data, setData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/production-entries');
                if (response.status === 200) {
                    console.log("Received data:", response.data);
                    setData(response.data);
                    setIsDataLoaded(true);
                } else {
                    console.error("데이터 불러오기 실패:", response.status);
                }
            } catch (error) {
                console.error("에러 발생:", error);
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
                        <h1>생산 입고 조회</h1>
                        <button className="create-button" onClick={() => navigate('/input2')}>
                            생성
                        </button>
                    </div>
                    <table className="table production-table">
                        <thead>
                            <tr>
                                <th>생산 입고 ID</th>
                                <th>작업 주문 ID</th>
                                <th>품질 관리 ID</th>
                                <th>생산 품목명</th>
                                <th>생산 수량</th>
                                <th>입고 날짜</th>
                                <th>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.entryId}</td>
                                        <td>{row.orderId}</td>
                                        <td>{row.qcid}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.entryDate}</td>
                                        <td>{row.etc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">등록된 데이터가 없습니다</td>
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

export default ProductionOrderPage;
