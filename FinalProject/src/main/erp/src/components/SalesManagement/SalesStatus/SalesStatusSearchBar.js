import React from 'react';
import { Form} from 'react-bootstrap';
import '../../../css/SalesManagement/SearchBar.css';






function SalesStatusSearchBar() {
  return (
    <Form inline className="d-flex align-items-center justify-content-between">
      {/* 왼쪽 영역 */}
      <div inline className="d-flex align-items-center justify-content-between">
        <p className="custom-padding">매출 현황</p>
      </div>
    </Form>
  );
}

export default SalesStatusSearchBar;
