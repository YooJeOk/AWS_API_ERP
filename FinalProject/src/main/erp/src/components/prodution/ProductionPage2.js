import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import InputForm2 from './InputForm2';
import axios from 'axios';

function ProductionEntry() {
    const [data, setData] = useState([]);  // 데이터를 관리할 상태
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Entry');
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

export default ProductionEntry;
