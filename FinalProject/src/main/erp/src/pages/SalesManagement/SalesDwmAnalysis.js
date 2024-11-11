import React, { useRef } from 'react';
import SalesDwmAnalysisTable from '../../components/SalesManagement/SalesDwmAnalysis/SalesDwmAnalysisTable';
import SalesDwmAnalysisSearchBar from '../../components/SalesManagement/SalesDwmAnalysis/SalesDwmAnalysisSearchBar';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/SalesManagement/SalesRecord.css';

function SalesStatus() {
  const tableRef = useRef(); // 테이블 캡처를 위한 ref 생성

  return (
    <div className="custom-background">
      {/* 메인 콘텐츠 */}
      <Container fluid>
        <Row>
          <Col sm={2}></Col>
          <Col sm={10}>
            {/* 검색 바에 tableRef 전달 */}
            <SalesDwmAnalysisSearchBar tableRef={tableRef} />
            
            {/* 상품 판매 기록 테이블 */}
            <div ref={tableRef}>
              <SalesDwmAnalysisTable />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SalesStatus;
