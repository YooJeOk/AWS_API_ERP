import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios import 추가
import './ProductionPage.css';

function MBOMTable() {
    const [data, setData] = useState([]);
    const [groupedData, setGroupedData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1; // 페이지 당 그룹 수 (ItemID별로 한 페이지)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/mbom/create'); // 실제 API 엔드포인트로 변경 필요
                if (response.status === 200) {
                    const result = response.data;
                    setData(result);

                    // ItemID 별로 데이터를 그룹화
                    const grouped = result.reduce((acc, item) => {
                        (acc[item.ItemID] = acc[item.ItemID] || []).push(item);
                        return acc;
                    }, {});
                    setGroupedData(grouped);
                } else {
                    console.error('데이터 불러오기 실패:', response.status);
                }
            } catch (error) {
                console.error('에러 발생:', error);
            }
        };

        fetchData();
    }, []);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(Object.keys(groupedData).length / itemsPerPage);

    // 현재 페이지에 해당하는 ItemID 그룹 가져오기
    const currentItemIDs = Object.keys(groupedData).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="custom-container">
            <h2>MBOM 조회</h2>
            {currentItemIDs.map((itemID) => (
                <div key={itemID} className="mbom-group">
                    <h3>ItemID: {itemID}</h3>
                    <table className="mbom-table">
                        <thead>
                            <tr>
                                <th>ItemID(빵&커피)</th>
                                <th>ItemType</th>
                                <th>Size</th>
                                <th>MaterialID</th>
                                <th>ProductName</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>UnitPrice</th>
                                <th>TotalCost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedData[itemID].map((row, index) => (
                                <tr key={index}>
                                    <td>{row.ItemID}</td>
                                    <td>{row.ItemType}</td>
                                    <td>{row.Size}</td>
                                    <td>{row.MaterialID}</td>
                                    <td>{row.ProductName}</td>
                                    <td>{row.Quantity}</td>
                                    <td>{row.Unit}</td>
                                    <td>{row.UnitPrice}</td>
                                    <td>{row.TotalCost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    이전
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default MBOMTable;
