import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import '../../css/SalesManagement/SearchBar.css';

function SearchBar() {
  return (
    <Form inline className="d-flex align-items-center justify-content-between">
      {/* 왼쪽 영역 */}
      <div inline className="d-flex align-items-center justify-content-between">
        <p className="custom-padding">상품 판매 기록 조회</p>
        <FormControl
          type="text"
          placeholder="yyyy-mm-dd"
          className="mr-sm-2 custom-form-control"
          style={{ width: '150px' }}
        />
        <span> ~ </span>
        <FormControl
          type="text"
          placeholder="yyyy-mm-dd"
          className="ml-sm-2 custom-form-control"
          style={{ width: '150px' }}
        />
      </div>

      {/* 오른쪽 영역 */}
      <div className="d-flex">
        <FormControl
          type="text"
          placeholder="입력"
          className="ml-sm-2 custom-form-control"
          style={{ width: '300px' }}
        />
        <Button variant="outline-success" className="ml-sm-2 custom-search-button">Search</Button>
      </div>
    </Form>
  );
}

export default SearchBar;
