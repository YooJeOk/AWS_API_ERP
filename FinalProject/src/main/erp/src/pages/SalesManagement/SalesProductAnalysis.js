import React from 'react';
import SalesProductAnalysisSearchBar from '../../components/SalesManagement/SalesProductAnalysis/SalesProductAnalysisSearchBar';
import SalesProductAnalysisTable from '../../components/SalesManagement/SalesProductAnalysis/SalesProductAnalysisTable';
import ActionButtons from '../../components/SalesManagement/ActionButtons';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/SalesManagement/SalesRecord.css'
function SalesProductAnalysis() {
  return (
    <div className="custom-background">
    


      {/* 메인 콘텐츠 */}
      <Container fluid>
        <Row>
          <Col sm={2}>
          </Col>
          <Col sm={10}>
            {/* 검색 바 */}
            <SalesProductAnalysisSearchBar />
            
            {/* 상품 판매 기록 테이블 */}
            <SalesProductAnalysisTable />

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SalesProductAnalysis;
