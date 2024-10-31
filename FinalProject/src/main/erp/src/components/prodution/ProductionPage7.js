import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './ProductionPage.css';
import InputForm7 from './InputForm7';

function Production7() {
    const [data] = useState([]);
    const navigate = useNavigate();

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
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.date}</td>
                                        <td>{row.productCode}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.defectType}</td>
                                        <td>{row.handlingMethod}</td>
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
