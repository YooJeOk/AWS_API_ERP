import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

import InputForm8 from './InputForm8';

function ProductionTable() {
    const [data, setData] = useState([]);
    const navigate = useNavigate(); // navigate 변수 선언

    useEffect(() => {
        const dummyData = [
            { productionItem: '갈릭꽈배기', consumedItem: '밀가루', itemCode: 'A123', itemSpec: 'g', quantity: 50, unitPrice: 1.5, totalCost: 75 },
            { productionItem: '갈릭꽈배기', consumedItem: '마늘', itemCode: 'A124', itemSpec: 'g', quantity: 50, unitPrice: 10, totalCost: 500 },
            { productionItem: '갈릭꽈배기', consumedItem: '설탕', itemCode: 'A125', itemSpec: 'g', quantity: 10, unitPrice: 0.5, totalCost: 5 },
            { productionItem: '갈릭꽈배기', consumedItem: '버터', itemCode: 'A126', itemSpec: 'g', quantity: 10, unitPrice: 12, totalCost: 120 },
            { productionItem: '갈릭꽈배기', consumedItem: '우유', itemCode: 'A127', itemSpec: 'ml', quantity: 20, unitPrice: 3, totalCost: 60 },
            { productionItem: '갈릭꽈배기', consumedItem: '이스트', itemCode: 'A128', itemSpec: 'g', quantity: 5, unitPrice: 3, totalCost: 15 },
            { productionItem: '갈릭꽈배기', consumedItem: '올리브오일', itemCode: 'A129', itemSpec: 'ml', quantity: 10, unitPrice: 10, totalCost: 100 },
            { productionItem: '갈릭꽈배기', consumedItem: '포장지', itemCode: 'A130', itemSpec: 'ea', quantity: 1, unitPrice: 10, totalCost: 10 },
        ];
        setData(dummyData);
    }, []);

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>소요량 조회</h1>
                        <button className="create-button" onClick={() => navigate('/input8')}>
                            생성
                        </button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>생산 품목</th>
                                <th>소모 품목</th>
                                <th>품목 코드</th>
                                <th>품목명(규격)</th>
                                <th>수량</th>
                                <th>단가</th>
                                <th>총 원가</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.productionItem}</td>
                                        <td>{row.consumedItem}</td>
                                        <td>{row.itemCode}</td>
                                        <td>{row.itemSpec}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.unitPrice}</td>
                                        <td>{row.totalCost}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">등록된 데이터가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Routes>
                    <Route path="/input8" element={<InputForm8 />} />
                </Routes>
            </main>
        </div>
    );
}

export default ProductionTable;
