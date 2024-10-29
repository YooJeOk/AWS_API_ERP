import React, { useState, useEffect } from 'react';
import './ProductionPage.css';

function ProductionOrderPage() {
    const [data, setData] = useState([]);  // 데이터를 관리할 상태
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const dummyData = [
                {
                    product: "Product A",
                    orderQuantity: "100 units",
                    orderDate: "2024-10-17",
                    dueDate: "2024-10-31",
                    priority: "High",
                    notes: "Additional information"
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
                        <h1>생산 주문 조회</h1>
                        <button className="create-button">생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>생산 품목</th>
                                <th>생산 수량</th>
                                <th>생산 날짜 및 시간</th>
                                <th>납기 날짜 및 시간</th>
                                <th>우선 순위</th>
                                <th>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.product}</td>
                                        <td>{row.orderQuantity}</td>
                                        <td>{row.orderDate}</td>
                                        <td>{row.dueDate}</td>
                                        <td>{row.priority}</td>
                                        <td>{row.notes}</td>
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
            </main>
        </div>
    );
}

export default ProductionOrderPage;
