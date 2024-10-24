import React from 'react';
import SalesDwmAnalysisTable from '../../components/SalesManagement/SalesDwmAnalysis/SalesDwmAnalysisTable';
import SalesDwmAnalysisSearchBar from '../../components/SalesManagement/SalesDwmAnalysis/SalesDwmAnalysisSearchBar';
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
            <SalesDwmAnalysisSearchBar />
            
            {/* 상품 판매 기록 테이블 */}
            <SalesDwmAnalysisTable />
            {/* 액션 버튼 */}
            <ActionButtons />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SalesStatus;
