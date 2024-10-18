import React, { useState, useEffect } from 'react';
import './0/ProductionPage.css';

function ProductionMonitoringPage() {
    const [data, setData] = useState([]);  // 데이터를 관리할 상태
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const dummyData = [
                {
                    status: "In Progress",
                    workOrderNo: "WO12345",
                    process: "Cutting",
                    itemCode: "P001",
                    itemName: "Product A",
                    orderQty: 100,
                    workQty: 90,
                    goodQty: 85,
                    defectQty: 5,
                    progressRate: "90%"
                }
            ];
            setData(dummyData);
            setIsDataLoaded(true);
        };

        fetchData();
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
                                <th>진행상태</th>
                                <th>작업지시번호</th>
                                <th>작업공정</th>
                                <th>품목코드</th>
                                <th>품목명</th>
                                <th>지시수량</th>
                                <th>작업수량</th>
                                <th>양품수량</th>
                                <th>불량수량</th>
                                <th>진행율</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{row.status}</td>
                                        <td>{row.workOrderNo}</td>
                                        <td>{row.process}</td>
                                        <td>{row.itemCode}</td>
                                        <td>{row.itemName}</td>
                                        <td>{row.orderQty}</td>
                                        <td>{row.workQty}</td>
                                        <td>{row.goodQty}</td>
                                        <td>{row.defectQty}</td>
                                        <td>{row.progressRate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11">등록된 데이터가 없습니다</td>
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
