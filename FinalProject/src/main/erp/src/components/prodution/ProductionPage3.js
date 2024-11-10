// ProductionPage3.js
import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import Pagination from './Pagination';
import InputForm3 from './InputForm3';
import SearchBar2 from './SearchBar2'; // Search2 컴포넌트 import
import axios from 'axios';
import './ProductionPage.css';

function ProductionPage3() {
    const [data, setData] = useState([]); // 전체 데이터를 관리할 상태
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 관리할 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const itemsPerPage = 12; // 한 페이지에 보여줄 항목 수
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/production-planning');
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
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <h1 className="custom-padding">생산 계획 조회</h1>
                    <SearchBar2 onSearch={handleSearch} /> 
                    <table className="table production-table">
                        <thead>
                            <tr>
                                <th>계획 ID</th>
                                <th>작업 지시ID</th>
                                <th>상품명</th>
                                <th>생산 수량</th>
                                <th>생산 시작 시간</th>
                                <th>생산 종료 시간</th>
                                <th>기타사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedData.length > 0 ? (
                                selectedData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.planId}</td>
                                        <td>{row.orderId}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.startDate}</td>
                                        <td>{row.endDate}</td>
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

                <Routes>
                    <Route path="/input3" element={<InputForm3 />} />
                </Routes>
            </main>
        </div>
    );
}

export default ProductionPage3;
