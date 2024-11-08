import React, { useRef } from 'react';
import SalesStatusSearchBar from '../../components/SalesManagement/SalesStatus/SalesStatusSearchBar';
import SalesStatusSalesTable from '../../components/SalesManagement/SalesStatus/SalesStatusSalesTable';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/SalesManagement/SalesRecord.css';

function SalesStatus() {
  const downloadRef = useRef(); // PDF로 저장할 영역의 참조 생성

  return (
    <div className="custom-background">
      <Container fluid>
        <Row>
          <Col sm={2}></Col>
          <Col sm={10}>
            <SalesStatusSearchBar  />
            
            <SalesStatusSalesTable downloadRef={downloadRef} showpage={true} />
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SalesStatus;
