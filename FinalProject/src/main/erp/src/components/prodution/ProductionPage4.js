// ProductionOrderPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Pagination from './Pagination';
import InputForm4 from './InputForm4';
import SearchBar2 from './SearchBar2';
import axios from 'axios';
import './Production6.css';

function ProductionOrderPage() {
    const [data, setData] = useState([]); // 전체 데이터를 관리할 상태
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 관리할 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const itemsPerPage = 12; // 한 페이지에 보여줄 항목 수
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/workorders');
                if (response.status === 200) {
                    const sortedData = response.data.reverse(); // 최신 데이터가 위로 오도록 정렬
                    setData(sortedData);
                    setFilteredData(sortedData); // 필터링된 데이터 초기화
                } else {
                    console.error("데이터 불러오기 실패:", response.status);
                }
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };

        fetchData();
    }, []);

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(dateString).toLocaleString('ko-KR', options);
    };

    // 검색 필터링 함수
    const handleSearch = (input, startDate, endDate) => {
        let filtered = data;

        if (input) {
            filtered = filtered.filter(item =>
                item.productName.toLowerCase().includes(input.toLowerCase())
            );
        }

        if (startDate) {
            filtered = filtered.filter(item => new Date(item.startDate) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(item => new Date(item.endDate) <= new Date(endDate));
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

    return (
        <div className="custom-container">
            <main className="production-content">
                <div className="production-mainbar">
                    <h1 className="custom-padding">생산 주문 조회</h1>
                    <SearchBar2 onSearch={handleSearch} />
                    <table className="table production-table">
                        <thead>
                            <tr>
                                <th>생산 품목 ID</th>
                                <th>제품명</th>
                                <th>생산 수량</th>
                                <th>생산 날짜 및 시간</th>
                                <th>납기 날짜 및 시간</th>
                                <th>우선 순위</th>
                                <th>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedData.length > 0 ? (
                                selectedData.map((row, index) => (
                                    <tr 
                                        key={index}
                                        style={row.etc === '특별생산품목' ? { color: 'red' } : {}}
                                    >
                                        <td>{row.productId}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{formatDate(row.startDate)}</td>
                                        <td>{formatDate(row.endDate)}</td>
                                        <td>{row.priority}</td>
                                        <td>{row.etc || '-'}</td>
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
                    <div className="button-group1">
                        <button className="create-button" onClick={() => navigate('/input4')}>생성</button>
                    </div>
                </div>

                <Routes>
                    <Route path="/input4" element={<InputForm4 />} />
                </Routes>
            </main>
        </div>
    );
}

export default ProductionOrderPage;
