import React, { useState, useEffect } from 'react';
import './0/production.css'; // 필요한 경우 스타일 연결

function Production5() {
    const [data, setData] = useState([]);  // 데이터를 관리할 상태
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        // 데이터를 불러오는 부분 (추후에 비동기 통신으로 대체 가능)
        const fetchData = () => {
            const dummyData = [
                {
                    productionItem: 'Item A',
                    consumedItem: 'Consumed A',
                    productionProcess: 'Process 1',
                    itemCode: 'A123',
                    itemNameSpec: 'Item Name (Spec)',
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
                        <h1>소요량 현황</h1>
                        <button className="create-button">생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>생산품목</th>
                                <th>소모품목</th>
                                <th>생산공정</th>
                                <th>품목코드</th>
                                <th>품목명(규격)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDataLoaded ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.productionItem}</td>
                                        <td>{row.consumedItem}</td>
                                        <td>{row.productionProcess}</td>
                                        <td>{row.itemCode}</td>
                                        <td>{row.itemNameSpec}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">등록된 데이터가 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Production5;
