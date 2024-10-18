import React, { useState, useEffect } from 'react';
import './0/ProductionPage.css';

function ProductionPage3() {
    const [data, setData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        // 데이터를 불러오는 비동기 처리 (임시 데이터 사용)
        const fetchData = () => {
            const dummyData = [
                {
                    workDate: "2024-10-17",
                    itemCode: "A123",
                    itemName: "Item A",
                    spec: "Spec A",
                    quantity: "100",
                    workItemName: "Work Item A",
                    resources: "Resource X, 2 hours"
                }
            ];
            setData(dummyData);
            setIsDataLoaded(true);
        };

        fetchData();
    }, []);

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>작업 내역 조회</h1>
                        <button className="create-button">생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>작업 일자</th>
                                <th>생산품목 코드</th>
                                <th>생산품목명</th>
                                <th>규격</th>
                                <th>수량</th>
                                <th>작업 품목명</th>
                                <th>투입자원&작업시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.workDate}</td>
                                        <td>{row.itemCode}</td>
                                        <td>{row.itemName}</td>
                                        <td>{row.spec}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.workItemName}</td>
                                        <td>{row.resources}</td>
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

export default ProductionPage3;
