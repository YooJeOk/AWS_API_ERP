import React from 'react';
import Sidebar from '../../components/SalesManagement/Sidebar';
import SearchBar from '../../components/SalesManagement/SearchBar';
import SalesTable from '../../components/SalesManagement/SalesTable';
import ActionButtons from '../../components/SalesManagement/ActionButtons';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/SalesManagement/SalesRecord.css'
function ProductSalesAnalysis() {
  return (
    <div className="custom-background">
    
<h1>제품별 판매 분석</h1>

      {/* 메인 콘텐츠 */}
      <Container fluid>
        <Row>
          <Col sm={3}>
            {/* 사이드바 */}
            <Sidebar />
          </Col>
          <Col sm={9}>
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



export default ProductSalesAnalysis;