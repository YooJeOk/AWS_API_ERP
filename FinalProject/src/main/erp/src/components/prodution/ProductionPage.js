import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductionPage.css';

function ProductionPage() {
    const [data, setData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 변경된 경로로 요청
                const response = await axios.get('http://localhost:8080/api/production-planning/basic');
                const fetchedData = response.data;
                
                setData(fetchedData);
                setIsDataLoaded(true);
            } catch (error) {
                console.error("데이터를 불러오는데 실패했습니다:", error);
                setIsDataLoaded(true);
            }
        };

        fetchData();
    }, []);

    const handleCreate = () => {
        navigate('/input'); 
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>생산 계획 조회</h1>
                        <button className="create-button" onClick={handleCreate}>생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>생산 계획 ID</th>
                                <th>작업 지시 ID</th>
                                <th>제품 ID</th>
                                <th>생산계획기간</th>
                                <th>작업수량</th>
                                <th>제품이름</th>
                                <th>상세보기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.length > 0 ? (
                                    data.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.planId || "N/A"}</td>
                                            <td>{row.orderId || "N/A"}</td>
                                            <td>{row.productId || "N/A"}</td>
                                            <td>{`${row.startDate} ~ ${row.endDate}`}</td>
                                            <td>{row.orderQuantity || "N/A"}</td>
                                            <td>{row.productName || "N/A"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">등록된 데이터가 없습니다</td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan="6">로딩 중...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default ProductionPage;
