import React from 'react';
import { Form} from 'react-bootstrap';
import '../../../css/SalesManagement/Siderbar.css';






function SalesProductAnalysisSearchBar() {
  return (
    <Form inline="true" className="d-flex align-items-center justify-content-between">
      {/* 왼쪽 영역 */}
      <div inline="true" className="d-flex align-items-center justify-content-between">
        <p className="custom-padding">제품별 판매 그래프</p>
      </div>
    </Form>
  );
}

export default SalesProductAnalysisSearchBar;
