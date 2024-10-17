import React, { useState, useEffect } from 'react';
import './styles.css';  // CSS 파일을 불러옴
import './ProductionPage.css';

function ProductionPage() {
    const [data, setData] = useState([]);  // 데이터를 관리할 state
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        // 데이터를 불러오는 부분 (추후에 비동기 통신으로 대체 가능)
        const fetchData = () => {
            const dummyData = [
                {
                    productionDate: "2024-10-17",
                    productionPeriod: "2024-10-01 ~ 2024-10-31",
                    item: "Item A",
                    productionCalculation: "50 units",
                    mrpCalculation: "45 units",
                    status: "In Progress",
                    etc: "None"
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
                        <h1>생산관리/MRP 리스트</h1>
                        <button className="create-button">생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>생산일자</th>
                                <th>생산계획기간</th>
                                <th>기준품목</th>
                                <th>생산계획계산</th>
                                <th>MRP계산</th>
                                <th>생산계획/MRP현황</th>
                                <th>기타</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.productionDate}</td>
                                        <td>{row.productionPeriod}</td>
                                        <td>{row.item}</td>
                                        <td>{row.productionCalculation}</td>
                                        <td>{row.mrpCalculation}</td>
                                        <td>{row.status}</td>
                                        <td>{row.etc}</td>
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

export default ProductionPage;
