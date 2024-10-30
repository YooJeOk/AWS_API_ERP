import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import InputForm3 from './InputForm3';
import axios from 'axios';
import './ProductionPage.css';

function ProductionPage3() {
    const [data, setData] = useState([]);  // 데이터를 관리할 상태
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/production-orders');
                if (response.status === 200) {
                    console.log("Received data:", response.data); // 데이터 확인
                    setData(response.data);
                    setIsDataLoaded(true);
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
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>생산 내역 조회</h1>
                        <button className="create-button" onClick={() => navigate('/input3')}>
                            생성
                        </button>
                    </div>
                    <table className="production-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>생산 일자</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>생산 품목 코드</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>생산 품목명</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>생산 수량</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>사용 원재료</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>기타사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.workDate}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.itemCode}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.itemName}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.spec}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.quantity}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.workItemName}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>등록된 데이터가 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* <InputForm3>만 라우트로 설정 */}
                <Routes>
                    <Route path="/input3" element={<InputForm3 />} />
                </Routes>
            </main>
        </div>
    );
}

export default ProductionPage3;
