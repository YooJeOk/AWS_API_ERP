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
                
                const response = await axios.get('/api/production-planning');
                setData(response.data); 
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
                        <h1>생산관리/MRP 리스트</h1>
                        <button className="create-button" onClick={handleCreate}>생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                
                                <th>생산계획기간</th>
                                <th>기준품목</th>
                                <th>생산계획계산</th>
                                <th>MRP계산</th>
                                <th>생산계획/MRP현황</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.length > 0 ? (
                                    data.map((row, index) => (
                                        <tr key={index}>
                                            
                                            <td>{`${row.startDate} ~ ${row.endDate}`}</td>
                                            <td>{row.productId}</td>
                                            <td>{row.productionCalculation || "N/A"}</td>
                                            <td>{row.mrpCalculation || "N/A"}</td>
                                            <td>{row.status || "N/A"}</td>
                                            
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">등록된 데이터가 없습니다</td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan="7">로딩 중...</td>
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
