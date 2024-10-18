import React from 'react';
import { Table } from 'react-bootstrap';
import '../../css/SalesManagement/SalesTable.css';

function SalesTable() {
  return (
    <Table Table className="custom-table" bordered hover>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>NO.</th>
          <th>상품명</th>
          <th>수량</th>
          <th>가격</th>
          <th>시간</th>
          <th>결제수단</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>1</td>
          <td>상품 A</td>
          <td>10</td>
          <td>1000</td>
          <td>2024-10-18 12:00</td>
          <td>신용카드</td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>2</td>
          <td>상품 A</td>
          <td>10</td>
          <td>1000</td>
          <td>2024-10-18 12:00</td>
          <td>신용카드</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default SalesTable;
