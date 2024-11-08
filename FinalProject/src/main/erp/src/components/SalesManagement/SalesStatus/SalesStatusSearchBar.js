// SalesStatusSearchBar.js
import React from 'react';
import { Form } from 'react-bootstrap';

import '../../../css/SalesManagement/SearchBar.css';

function SalesStatusSearchBar() {


  return (
    <Form className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <p className="custom-padding">매출 현황</p>
      </div>
    </Form>
  );
}

export default SalesStatusSearchBar;
