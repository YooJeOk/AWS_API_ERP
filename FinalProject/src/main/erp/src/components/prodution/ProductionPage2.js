import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import InputForm4 from './InputForm4';
import axios from 'axios';

function ProductionOrderPage() {
    const [data, setData] = useState([]);  // 데이터를 관리할 상태
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/productionplanning');
                if (response.status === 200) {
                    console.log("Received data:", response.data); // 데이터 확인
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
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>생산 계획 조회</h1>
                        <button className="create-button" onClick={() => navigate('/input4')}>
                            생성
                        </button>
                    </div>
                    <table className="production-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '10%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>작업 지시 ID</th>
                                <th style={{ width: '10%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>생산 품목 ID</th>
                                <th style={{ width: '20%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>생산 품목명</th>
                                <th style={{ width: '10%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>생산 수량</th>
                                <th style={{ width: '15%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>생산 시작 날짜 및 시간</th>
                                <th style={{ width: '15%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>납기 날짜 및 시간</th>
                                <th style={{ width: '20%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.orderId}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.productId}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.productName}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.quantity}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.startDate}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.endDate}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.etc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>등록된 데이터가 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Routes>
                    <Route path="/input4" element={<InputForm4 />} />
                </Routes>
            </main>
        </div>
    );
}

export default ProductionOrderPage;
