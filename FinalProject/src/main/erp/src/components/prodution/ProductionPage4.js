import React, { useState, useEffect } from 'react';
import './ProductionPage.css';

function ProductionOrderPage() {
    const [data, setData] = useState([]);  // 데이터를 관리할 상태
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const dummyData = [
                {
                    orderDate: "2024-10-17",
                    dueDate: "2024-10-31",
                    product: "Product A",
                    orderQuantity: "100 units",
                    productionQuantity: "90 units",
                    isComplete: "No"
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
                        <h1>작업 주문</h1>
                        <button className="create-button">생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>주문 날짜</th>
                                <th>납기 날짜</th>
                                <th>생산품목</th>
                                <th>주문 수량</th>
                                <th>생산 수량</th>
                                <th>종결여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.orderDate}</td>
                                        <td>{row.dueDate}</td>
                                        <td>{row.product}</td>
                                        <td>{row.orderQuantity}</td>
                                        <td>{row.productionQuantity}</td>
                                        <td>{row.isComplete}</td>
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
