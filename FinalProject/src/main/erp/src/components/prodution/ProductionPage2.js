import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import InputForm4 from './InputForm4';
import axios from 'axios';

function ProductionOrderPage() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/productionplanning');
                if (response.status === 200) {
                    console.log("Received data:", response.data);
                    setData(response.data);
                } else {
                    console.error("데이터 불러오기 실패:", response.status);
                    setError("데이터를 불러오는 중 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("에러 발생:", error);
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        };

        fetchData();
    }, []);

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    };

    const cellStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center'
    };

    const headerStyle = {
        ...cellStyle,
        backgroundColor: '#f2f2f2'
    };

    const buttonStyle = {
        fontSize: '20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '5px 30px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    return (
        <div style={{ padding: '20px' }}>
            <main>
                <div>
                    <div>
                        <h1>생산 계획 조회</h1>
                        <button style={buttonStyle} onClick={() => navigate('/input4')}>
                            생성
                        </button>
                    </div>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={headerStyle}>작업 지시 ID</th>
                                <th style={headerStyle}>생산 품목 ID</th>
                                <th style={headerStyle}>생산 품목명</th>
                                <th style={headerStyle}>생산 수량</th>
                                <th style={headerStyle}>생산 시작 날짜 및 시간</th>
                                <th style={headerStyle}>납기 날짜 및 시간</th>
                                <th style={headerStyle}>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td colSpan="7" style={{ ...cellStyle, color: 'red' }}>{error}</td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td style={cellStyle}>{row.orderId}</td>
                                        <td style={cellStyle}>{row.productId}</td>
                                        <td style={cellStyle}>{row.productName}</td>
                                        <td style={cellStyle}>{row.quantity}</td>
                                        <td style={cellStyle}>{row.startDate}</td>
                                        <td style={cellStyle}>{row.endDate}</td>
                                        <td style={cellStyle}>{row.etc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ ...cellStyle, color: '#555' }}>등록된 데이터가 없습니다</td>
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
