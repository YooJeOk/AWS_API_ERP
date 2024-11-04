import React, { useState } from 'react';
import SearchBar from '../../components/SalesManagement/SearchBar';
import SalesTable from '../../components/SalesManagement/SalesTable';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/SalesManagement/SalesRecord.css';

function SalesRecord() {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // SearchBar에서 검색어와 날짜를 받아오는 함수
  const handleSearch = (term, start, end) => {
    setSearchTerm(term);
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="custom-background">
      <Container fluid>
        <Row>
          <Col sm={2}></Col>
          <Col sm={10}>
            {/* 검색 바 */}
            <SearchBar onSearch={handleSearch} />

            {/* 상품 판매 기록 테이블 */}
            <SalesTable searchTerm={searchTerm} startDate={startDate} endDate={endDate} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SalesRecord;
