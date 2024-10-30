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
                        <h1>품질검사 등록</h1>
                        <button className="create-button" onClick={() => navigate('/input7')}>
                            생성
                        </button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>검사 일자</th>
                                <th>검사 방법</th>
                                <th>품목 코드</th>
                                <th>품목명</th>
                                <th>수량</th>
                                <th>시료</th>
                                <th>합격 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.productionDate}</td>
                                        <td>{row.productionCalculation}</td>
                                        <td>{row.productionPeriod}</td>
                                        <td>{row.baseItem}</td>
                                        <td>{row.mrpCalculation}</td>
                                        <td>{row.status}</td>
                                        <td>{row.others}</td>
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
                    <Route path="/input7" element={<InputForm7 />} />
                </Routes>
            </main>
        </div>
    );
}

export default Production7;
