import React, { useState, useEffect } from 'react';
import './styles.css'; // CSS 파일을 불러옴

function Production6() {
    const [data, setData] = useState([]);  // 데이터를 관리할 state
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        // 데이터를 불러오는 부분 (추후에 비동기 통신으로 대체 가능)
        const fetchData = () => {
            const dummyData = [
                {
                    date: "2024-10-17",
                    productCode: "P001",
                    productName: "Product A",
                    quantity: "100 units",
                    defectType: "Type A",
                    handlingMethod: "Method A"
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
                        <h1>불량 조회</h1>
                        <button className="create-button">생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>입력일자</th>
                                <th>생산품목코드</th>
                                <th>생산품목명</th>
                                <th>수량</th>
                                <th>불량유형</th>
                                <th>처리방법</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.date}</td>
                                        <td>{row.productCode}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.defectType}</td>
                                        <td>{row.handlingMethod}</td>
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

export default Production6;
