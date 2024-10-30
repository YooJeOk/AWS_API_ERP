import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../css/SalesManagement/SalesTable.css';

function SalesTable() {
  const [salesRecords, setSalesRecords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/sales/records")
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate));
        setSalesRecords(sortedData);
      })
      .catch(error => console.error("Error fetching sales records:", error));
  }, []);

  return (
    <Table className="custom-table" bordered hover>
      <thead>
        <tr>
          <th className="no-column">NO.</th>
          <th>판매일시</th>
          <th>상품명</th>
          <th className="num-column">수량</th>
          <th className="unitprice-column">단가</th>
          <th className="promotion-column">할인</th>
          <th className="totalprice-column">총액</th>
          <th className="payment-column">결제수단</th>
        </tr>
      </thead>
      <tbody>
        {salesRecords.map((record, index) => {
          return (
            <tr key={record.saleID}>
              <td>{index + 1}</td>
              <td>{new Date(record.saleDate).toLocaleString()}</td>
              <td>
                {(record.salesDetails || []).map(detail =>
                  detail.product ? detail.product.productName : detail.coffee ? detail.coffee.coffeeName : "N/A"
                ).join(", ")}
              </td>
              <td>{(record.salesDetails || []).map(detail => detail.quantitySold || "N/A").join(", ")}</td>
              <td>{(record.salesDetails || []).map(detail => detail.salePrice || "N/A").join(", ")}</td>
              <td>{record.discountAmount}</td>
              <td>{record.totalSalePrice}</td>
              <td>{record.paymentType}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default SalesTable;