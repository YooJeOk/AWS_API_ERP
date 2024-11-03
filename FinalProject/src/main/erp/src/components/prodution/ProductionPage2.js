// ProductionOrderPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom'; 
import InputForm2 from './InputForm2';  // InputForm2로 변경
import axios from 'axios';
import './ProductionPage.css';

function ProductionOrderPage() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/production-entry');
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

    
    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <h2>사이드바 메뉴</h2>
                {/* 사이드바 내용 추가 가능 */}
            </aside>
            <main style={styles.content}>
                <div style={styles.mainbar}>
                    <div style={styles.bar}>
                        <h1 style={styles.heading}>생산 입고 조회</h1>
                        <button style={styles.button} onClick={() => navigate('/input2')}>
                            생성
                        </button>
                    </div>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>생산 입고 ID</th>
                                <th style={styles.th}>작업 주문 ID</th>
                                <th style={styles.th}>품질 관리 ID</th>
                                <th style={styles.th}>생산 품목명</th>
                                <th style={styles.th}>생산 수량</th>
                                <th style={styles.th}>입고 날짜</th>
                                <th style={styles.th}>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td colSpan="7" style={styles.error}>{error}</td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td style={styles.td}>{row.EntryID}</td>
                                        <td style={styles.td}>{row.OrderID}</td>
                                        <td style={styles.td}>{row.QCID}</td>
                                        <td style={styles.td}>{row.ProductName }</td>
                                        <td style={styles.td}>{row.Quantity}</td>
                                        <td style={styles.td}>{row.EntryDate}</td>
                                        <td style={styles.td}>{row.etc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={styles.emptyRow}>등록된 데이터가 없습니다</td>
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
