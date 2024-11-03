import React, { useState } from 'react';
import './ProductionPage.css';


function MBOMView() {
    const [data] = useState([]);  // 초기 데이터가 비어있음
    

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>생산 실적 조회</h1>
                    </div>
                    <table className="table production-table">
                        <thead>
                            <tr>
                                <th>작업 일자</th>
                                <th>작업지시번호</th>
                                <th>품목명</th>
                                <th>수량</th>
                                <th>불량률</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.productionDate}</td>
                                        <td>{row.productionCalculation}</td>
                                        <td>{row.baseItem}</td>
                                        <td>{row.status}</td>
                                        <td>{row.mrpCalculation}</td>
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

export default MBOMView;
