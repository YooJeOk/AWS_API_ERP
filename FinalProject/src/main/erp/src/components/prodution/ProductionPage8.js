import React, { useState, useEffect } from 'react';
import './ProductionPage.css';

function ProductionMonitoringPage() {
    const [data, setData] = useState([]);  // 데이터를 관리할 상태
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchCSVData = async () => {
            try {
                const response = await fetch('/api/production-monitoring');  // 백엔드 API 경로
                const result = await response.json();  // CSV 데이터를 JSON 형태로 변환
    
                console.log(result);  // 데이터를 콘솔에 출력
                const formattedData = result.map((row, index) => ({
                    id: index + 1,
                    orderId: row.orderId,
                    temperature: row.temperature,
                    humidity: row.humidity,
                    productionRate: row.productionRate,
                    operationTime: row.operationTime,
                    startTime: row.startTime
                }));
    
                setData(formattedData);
                setIsDataLoaded(true);
            } catch (error) {
                console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
            }
        };
    
        fetchCSVData();
    }, []);
    

    return (
        <div className="custom-container">
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>생산 모니터링</h1>
                        <h3>현재 시간</h3>
                        <h3>작업장 온도</h3>
                        <h3>작업장 습도</h3>
                        <h3>갱신주기</h3>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>NO.</th>
                                <th>작업지시번호</th>
                                <th>온도</th>
                                <th>습도</th>
                                <th>생산률</th>
                                <th>작업 시간</th>
                                <th>작업 시작 시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.id}</td>
                                        <td>{row.orderId}</td>
                                        <td>{row.temperature}</td>
                                        <td>{row.humidity}</td>
                                        <td>{row.productionRate}%</td>
                                        <td>{row.operationTime} 분</td>
                                        <td>{row.startTime}</td>
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
            </main>
        </div>
    );
}

export default ProductionMonitoringPage;
