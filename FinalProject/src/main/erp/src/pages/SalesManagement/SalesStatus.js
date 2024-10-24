import React from 'react';
import Sidebar from '../../components/SalesManagement/Sidebar';
import SalesStatusSearchBar from '../../components/SalesManagement/SalesStatus/SalesStatusSearchBar';
import SalesStatusSalesTable from '../../components/SalesManagement/SalesStatus/SalesStatusSalesTable';
import ActionButtons from '../../components/SalesManagement/ActionButtons';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/SalesManagement/SalesRecord.css'
function SalesStatus() {
  return (
    <div className="custom-background">
    
      {/* 메인 콘텐츠 */}
      <Container fluid>
        <Row>
          <Col sm={2}>
          </Col>
          <Col sm={10}>
            {/* 검색 바 */}
            <SalesStatusSearchBar />
            
            {/* 상품 판매 기록 테이블 */}
            <SalesStatusSalesTable />

          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default SalesStatus;
