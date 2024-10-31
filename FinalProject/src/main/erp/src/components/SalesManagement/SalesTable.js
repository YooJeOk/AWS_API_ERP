import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../css/SalesManagement/SalesTable.css';

function SalesTable({ searchTerm }) {
  const [salesRecords, setSalesRecords] = useState([]);

  useEffect(() => {
    const fetchSalesRecords = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/sales/records");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate));

        // 각 record의 할인 금액을 개별 detail에 분배
        const dataWithDistributedDiscounts = sortedData.flatMap(record => {
          const totalAmount = record.salesDetails.reduce(
            (sum, detail) => sum + (detail.salePrice * detail.quantitySold), 0
          );

          const detailsWithDiscounts = record.salesDetails.map(detail => {
            const itemTotalPrice = (detail.salePrice || 0) * (detail.quantitySold || 0);
            const discountShare = ((itemTotalPrice / totalAmount) * (record.discountAmount || 0)).toFixed(0);

            return {
              saleID: record.saleID,
              saleDate: record.saleDate,
              paymentType: record.paymentType,
              productName: detail.productName || detail.coffeeName || "N/A",
              quantitySold: detail.quantitySold || 0,
              salePrice: detail.salePrice || 0,
              discountShare: parseInt(discountShare),
              totalPrice: itemTotalPrice - parseInt(discountShare)
            };
          });
          
          return detailsWithDiscounts;
        });

        setSalesRecords(dataWithDistributedDiscounts);
      } catch (error) {
        console.error("Error fetching sales records:", error);
      }
    };

    fetchSalesRecords();
  }, []);

  const filteredRecords = salesRecords.filter(detail =>
    (detail.productName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Table className="custom-table" bordered hover>
      <thead>
        <tr>
          <th className="no-column">SaleID</th>
          <th>판매날짜</th>
          <th>상품명</th>
          <th className="num-column">수량</th>
          <th className="unitprice-column">단가</th>
          <th className="promotion-column">할인</th>
          <th className="totalprice-column">판매금액</th>
          <th className="payment-column">결제수단</th>
        </tr>
      </thead>
      <tbody>
        {filteredRecords.map((detail, index) => (
          <tr key={`${detail.saleID}-${index}`}>
            <td>{detail.saleID}</td>
            <td>{detail.saleDate ? new Date(detail.saleDate).toLocaleString() : "N/A"}</td>
            <td>{detail.productName}</td>
            <td>{detail.quantitySold}</td>
            <td>{detail.salePrice.toLocaleString()}원</td>
            <td>{detail.discountShare}원</td>
            <td>{detail.totalPrice ? detail.totalPrice.toLocaleString() : "N/A"}원</td>
            <td>{detail.paymentType}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SalesTable;
