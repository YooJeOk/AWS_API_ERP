import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import '../../css/SalesManagement/SalesTable.css';

function SalesTable({ searchTerm, startDate, endDate, maxItems = null, showpage = true, showTooltip = false }) {
  const [salesRecords, setSalesRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchSalesRecords = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/salesrecord");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate));

        const dataWithDistributedDiscounts = sortedData.flatMap(record => {
          const totalAmount = record.salesDetails.reduce(
            (sum, detail) => sum + (detail.salePrice * detail.quantitySold), 0
          );

          const detailsWithDiscounts = record.salesDetails.map(detail => {
            const itemTotalPrice = (detail.salePrice || 0) * (detail.quantitySold || 0);
            const discountShare = totalAmount > 0 
              ? ((itemTotalPrice / totalAmount) * (record.discountAmount || 0)).toFixed(0) 
              : 0;

            return {
              saleID: record.saleID,
              saleDate: record.saleDate,
              paymentType: record.paymentType,
              productName: detail.product?.productName || detail.coffee?.coffeeName || "N/A",
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

  const filteredRecords = salesRecords.filter(detail => {
    const recordDate = new Date(detail.saleDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      (detail.productName || "").toLowerCase().includes((searchTerm || "").toLowerCase()) &&
      (!start || recordDate >= start) &&
      (!end || recordDate <= end)
    );
  });

  const displayedRecords = maxItems ? filteredRecords.slice(0, maxItems) : filteredRecords;

  const pageCount = Math.ceil(displayedRecords.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentItems = displayedRecords.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
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
          {currentItems.map((detail, index) => (
            <tr key={`${detail.saleID}-${index}`}>
              <td>{detail.saleID}</td>
              {/* showTooltip이 true일 때 title 속성 및 시:분까지 표시 */}
              <td title={showTooltip ? new Date(detail.saleDate).toLocaleString() : undefined}>
                {detail.saleDate ? new Date(detail.saleDate).toLocaleDateString() + ' ' + new Date(detail.saleDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
              </td>
              <td>{detail.productName}</td>
              <td>{detail.quantitySold}</td>
              <td>{detail.salePrice.toLocaleString()}원</td>
              <td>{detail.discountShare.toLocaleString()}원</td>
              <td>{detail.totalPrice.toLocaleString()}원</td>
              <td>{detail.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showpage && 
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />}
    </div>
  );
}

export default SalesTable;
