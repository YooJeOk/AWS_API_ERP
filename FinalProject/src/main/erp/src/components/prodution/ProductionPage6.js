// Production6.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import SearchBar3 from './SearchBar3';
import './Production6.css';

function Production6() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/defects');
                if (response.status === 200) {
                    const sortedData = response.data.reverse();
                    setData(sortedData);
                    setFilteredData(sortedData);
                } else {
                    setError("데이터를 불러오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("에러 발생:", error);
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        };

        fetchData();
    }, []);

    const handleStatusUpdate = async (qcid) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/defects/complete/qcid/${qcid}`);
            if (response.status === 200) {
                setData(prevData =>
                    prevData.map(item =>
                        item.qcid === qcid ? { ...item, status: '완료' } : item
                    )
                );
                setFilteredData(prevData =>
                    prevData.map(item =>
                        item.qcid === qcid ? { ...item, status: '완료' } : item
                    )
                );
            } else {
                setError("상태 업데이트에 실패했습니다.");
            }
        } catch (error) {
            console.error("상태 업데이트 오류:", error);
            setError("상태 업데이트 중 오류가 발생했습니다.");
        }
    };

    const handleSearch = (searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filtered = data.filter(item =>
            (item.orderId && item.orderId.toString().includes(lowerCaseSearchTerm)) ||
            (item.productName && item.productName.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (item.quantity && item.quantity.toString().includes(lowerCaseSearchTerm)) ||
            (item.defectType && item.defectType.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (item.causeDescription && item.causeDescription.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (item.status && item.status.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (item.defectRate && item.defectRate.toString().includes(lowerCaseSearchTerm)) ||
            (item.etc && item.etc.toLowerCase().includes(lowerCaseSearchTerm))
        );

        setFilteredData(filtered);
        setCurrentPage(0);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = currentPage * itemsPerPage;
    const selectedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1 className="custom-padding">불량 검사 결과 조회</h1>
                    </div>
                    <SearchBar3 onSearch={handleSearch} />
                    <table className="table production-table">
                        <thead>
                            <tr>
                                <th>품질 관리ID</th>
                                <th>주문 ID</th>
                                <th>상품명</th>
                                <th>상품 수량</th>
                                <th>불량 유형</th>
                                <th>불량 수량</th>
                                <th style={{ width: '20%' }}>불량 원인</th>
                                <th>불량 처리 상태</th>
                                <th>불량률</th>
                                <th>기타</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: 'center', color: 'red' }}>{error}</td>
                                </tr>
                            ) : selectedData.length > 0 ? (
                                selectedData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.qcid}</td>
                                        <td>{row.orderId}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.defectType}</td>
                                        <td>{row.defectQuantity}</td>
                                        <td>{row.causeDescription}</td>
                                        <td>
                                            {row.status === '미처리' ? (
                                                <button
                                                    onClick={() => handleStatusUpdate(row.qcid)}
                                                    className="status-button">
                                                    미처리
                                                </button>
                                            ) : (
                                                <span className="status-complete">완료</span>
                                            )}
                                        </td>
                                        <td>{row.defectRate}</td>
                                        <td>{row.etc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: 'center' }}>등록된 데이터가 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
        </div>
    );
}

export default Production6;
