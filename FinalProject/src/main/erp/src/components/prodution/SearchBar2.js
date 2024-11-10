import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import '../../css/SalesManagement/SearchBar.css';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearchClick = () => {
    onSearch(input, startDate, endDate);
  };

  return (
    <Form inline="true" className="d-flex align-items-center justify-content-between">
      {/* 왼쪽 영역 */}
      <div className="d-flex align-items-center justify-content-between">
        
        <FormControl
          type="date"
          placeholder="yyyy-mm-dd"
          className="mr-sm-2 custom-form-control"
          style={{ width: '150px' }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span> ~ </span>
        <FormControl
          type="date"
          placeholder="yyyy-mm-dd"
          className="ml-sm-2 custom-form-control"
          style={{ width: '150px' }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* 오른쪽 영역 */}
      <div className="d-flex">
        <FormControl
          type="text"
          placeholder="상품명을 입력하세요"
          className="ml-sm-2 custom-form-control"
          style={{ width: '300px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="outline-success"
          className="ml-sm-2 custom-search-button"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </div>
    </Form>
  );
}

export default SearchBar;
