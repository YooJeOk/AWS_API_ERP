// ProductionOrderPage.js
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

import SearchBar2 from './SearchBar2'; // SearchBar2 컴포넌트 import
import axios from 'axios';
import './ProductionPage.css';

function ProductionOrderPage() {
    const [data, setData] = useState([]); // 전체 데이터를 관리할 상태
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const itemsPerPage = 12; // 한 페이지에 보여줄 항목 수
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/production-entries');
                if (response.status === 200) {
                    const sortedData = response.data.reverse(); // 최신 데이터가 위로 오도록 정렬
                    setData(sortedData);
                    setFilteredData(sortedData); // 초기 필터링 데이터 설정
                } else {
                    console.error("데이터 불러오기 실패:", response.status);
                }
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };

        fetchData();
    }, []);

    // 검색 필터링 함수
    const handleSearch = (searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filtered = data.filter(item =>
            (item.orderId && item.orderId.toString().includes(lowerCaseSearchTerm)) ||
            (item.qcid && item.qcid.toString().includes(lowerCaseSearchTerm)) ||
            (item.productName && item.productName.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (item.quantity && item.quantity.toString().includes(lowerCaseSearchTerm)) ||
            (item.etc && item.etc.toLowerCase().includes(lowerCaseSearchTerm))
        );

        setFilteredData(filtered);
        setCurrentPage(0); // 검색 시 첫 페이지로 이동
    };

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 현재 페이지에 보여줄 데이터 계산
    const startIndex = currentPage * itemsPerPage;
    const selectedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1 className="custom-padding">생산 입고 조회</h1>
                        
                    </div>
                    <SearchBar2 onSearch={handleSearch} /> {/* SearchBar2 추가 */}
                    <table className="table production-table">
                        <thead>
                            <tr>
                                <th>생산 입고 ID</th>
                                <th>작업 주문 ID</th>
                                <th>품질 관리 ID</th>
                                <th>생산 품목명</th>
                                <th>생산 수량</th>
                                <th>입고 날짜</th>
                                <th>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedData.length > 0 ? (
                                selectedData.map((row, index) => (
                                    <tr key={row.entryId || index}>
                                        <td>{row.entryId}</td>
                                        <td>{row.orderId}</td>
                                        <td>{row.qcid}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.entryDate}</td>
                                        <td>{row.etc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>등록된 데이터가 없습니다</td>
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

export default ProductionOrderPage;
