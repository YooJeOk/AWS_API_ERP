import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './ProductionPage.css';
import InputForm2 from './InputForm2';

function InputArrivalForm() {
    const [tableData] = useState([]); 
    const navigate = useNavigate();

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
                                <th>생산품목 코드</th>
                                <th>생산품목명</th>
                                <th>규격</th>
                                <th>수량</th>
                                <th>기타</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.arrivalDate}</td>
                                        <td>{row.productCode}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.specification}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.others}</td>
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
                    <Route path="/input2" element={<InputForm2 />} />
                </Routes>
            </main>
        </div>
    );
}

export default InputArrivalForm;
