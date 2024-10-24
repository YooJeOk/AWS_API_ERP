import React from 'react';
import SalesDwtdAnalysisSearchBar from '../../components/SalesManagement/SalesDwtdAnalysis/SalesDwtdAnalysisSearchBar';
import ActionButtons from '../../components/SalesManagement/SalesDwtdAnalysis/SalesDwtdAnalysisActionButtons';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/SalesManagement/SalesRecord.css'
import SalesDwtdAnalysisTable from '../../components/SalesManagement/SalesDwtdAnalysis/SalesDwtdAnalysisTable'
function SalesDwtdAnalysis() {


  return (
    <div className="custom-background">
    


      {/* 메인 콘텐츠 */}
      <Container fluid>
        <Row>
          <Col sm={2}>
          </Col>
          <Col sm={10}>
            {/* 검색 바 */}
            <SalesDwtdAnalysisSearchBar />
            
            {/* 상품 판매 기록 테이블 */}
            <SalesDwtdAnalysisTable />

            {/* 액션 버튼 */}
            <ActionButtons />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SalesDwtdAnalysis;
