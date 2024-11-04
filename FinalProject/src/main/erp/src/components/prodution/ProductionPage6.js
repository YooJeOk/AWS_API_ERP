import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './ProductionPage.css';
import InputForm6 from './InputForm6';

function Production6() {
    const [data, setData] = useState([]); // 불량 관리 데이터를 저장할 상태
    const [error, setError] = useState(null); // 에러 메시지 상태
    const navigate = useNavigate();

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/defects'); // API URL을 실제 서버 주소로 변경
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    setError("데이터를 불러오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("에러 발생:", error);
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
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
                        <button className="create-button" onClick={() => navigate('/input6')}>
                            생성
                        </button>
                    </div>
                    <table className="table production-table">
                        <thead>
                            <tr>
                                <th>품질 관리ID</th>
                                <th>주문 ID</th>
                                <th>상품명</th>
                                <th>상품 수량</th>
                                <th>불량 유형</th>
                                <th>불량 수량</th>
                                <th>불량 원인</th>
                                <th>불량 처리 상태</th>
                                <th>불량률</th>
                                <th>기타</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: 'center', color: 'red' }}>{error}</td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.qcid}</td>
                                        <td>{row.orderId}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.defectType}</td>
                                        <td>{row.defectQuantity}</td>
                                        <td>{row.causeDescription}</td>
                                        <td>{row.status}</td>
                                        <td>{row.defectRate}</td>
                                        <td>{row.etc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: 'center' }}>등록된 데이터가 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Routes>
                    <Route path="/input6" element={<InputForm6 />} />
                </Routes>
            </main>
        </div>
    );
}

export default Production6;
