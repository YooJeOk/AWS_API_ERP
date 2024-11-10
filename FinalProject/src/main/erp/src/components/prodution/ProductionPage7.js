// Production7.js
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchBar2 from './SearchBar2'; // SearchBar2 컴포넌트 import
import axios from 'axios';
import './ProductionPage.css';

function Production7() {
    const [data, setData] = useState([]); // 전체 데이터를 관리할 상태
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 관리할 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const itemsPerPage = 12; // 한 페이지에 보여줄 항목 수
    

    // 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/quality-control');
                if (response.status === 200) {
                    // 최신 데이터가 위로 오도록 정렬
                    const sortedData = response.data.reverse();
                    setData(sortedData);
                    setFilteredData(sortedData); // 초기 필터링 데이터 설정
                }
            } catch (error) {
                console.error("데이터를 불러오는 중 에러 발생:", error);
                alert("데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        };
        fetchData();
    }, []);

    // 검색 필터링 함수
    const handleSearch = (input, startDate, endDate) => {
        let filtered = data;

        if (input) {
            filtered = filtered.filter(item =>
                item.productName.toLowerCase().includes(input.toLowerCase()) || 
                item.orderID.toString().includes(input)
            );
        }

        if (startDate) {
            filtered = filtered.filter(item => new Date(item.testDate) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(item => new Date(item.testDate) <= new Date(endDate));
        }

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

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1 className="custom-padding">품질검사 조회</h1>
                       
                    </div>
                    <SearchBar2 onSearch={handleSearch} /> {/* SearchBar2 추가 */}
                    <table className="table production-table">
                        <thead>
                            <tr>
                                <th>주문ID</th>
                                <th>상품명</th>
                                <th>검사 수량</th>
                                <th>검사 날짜</th>
                                <th>검사 결과</th>
                                <th>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedData.length > 0 ? (
                                selectedData.map((row, index) => (
                                    <tr key={row.qcid || index}>
                                        <td>{row.orderID}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{formatDate(row.testDate)}</td>
                                        <td>{row.testResult}</td>
                                        <td>{row.etc || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>등록된 데이터가 없습니다</td>
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

export default Production7;
