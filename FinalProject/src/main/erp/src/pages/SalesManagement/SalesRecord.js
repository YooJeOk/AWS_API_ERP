import React from 'react';
import SearchBar from '../../components/SalesManagement/SearchBar';
import SalesTable from '../../components/SalesManagement/SalesTable';
import ActionButtons from '../../components/SalesManagement/ActionButtons';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/SalesManagement/SalesRecord.css'
function SalesRecord() {
  return (
    <div className="custom-background">
    


      {/* 메인 콘텐츠 */}
      <Container fluid>
        <Row>
          <Col sm={2}>
          </Col>
          <Col sm={10}>
            {/* 검색 바 */}
            <SearchBar />
            
            {/* 상품 판매 기록 테이블 */}
            <SalesTable />

            {/* 액션 버튼 */}
            <ActionButtons />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SalesRecord;