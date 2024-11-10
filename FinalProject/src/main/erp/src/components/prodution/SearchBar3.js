import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import '../../css/SalesManagement/SearchBar.css';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSearchClick = () => {
    onSearch(input);
  };

  return (
    <div className="d-flex justify-content-end"> {/* 부모 div에 justify-content-end 추가 */}
      <Form inline="true" className="d-flex align-items-center">
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
      </Form>
    </div>
  );
}

export default SearchBar;
