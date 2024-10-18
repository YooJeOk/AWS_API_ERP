import React, { useState, useEffect } from 'react';


function Production7() {
    const [data, setData] = useState([]);  // 데이터를 관리할 state
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        // 데이터를 불러오는 부분 (추후에 비동기 통신으로 대체 가능)
        const fetchData = () => {
            const dummyData = [
                {
                    inspectionDate: "2024-10-17",
                    inspectionMethod: "Method A",
                    productCode: "P001",
                    productName: "Product A",
                    quantity: "100 units",
                    sample: "Sample A",
                    passStatus: "Pass"
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
                        <h1>품질검사 조회</h1>
                        <button className="create-button">생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>검사일자</th>
                                <th>검사방법</th>
                                <th>품목코드</th>
                                <th>품목명</th>
                                <th>수량</th>
                                <th>시료</th>
                                <th>합격여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.inspectionDate}</td>
                                        <td>{row.inspectionMethod}</td>
                                        <td>{row.productCode}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.sample}</td>
                                        <td>{row.passStatus}</td>
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

export default Production7;
