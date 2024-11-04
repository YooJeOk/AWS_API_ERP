import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/SalesManagement/SalesStatusSalesTable.css';

function SalesStatusSalesTable() {
  const [salesData, setSalesData] = useState({
    todayAmount: 0,
    todayCount: 0,
    thisWeekAmount: 0,
    thisWeekCount: 0,
    thisMonthAmount: 0,
    thisMonthCount: 0,
    thisYearAmount: 0,
    thisYearCount: 0,
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/totalsales')
      .then((response) => response.json())
      .then((data) => setSalesData(data))
      .catch((error) => console.error('Error fetching sales data:', error));
  }, []);

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('ko-KR').format(number);
  };

  return (
    <div className="container">
      <div className="row SalesStatusSalesTable-box">
        <div className="col">
          <div className="amount today" style={{ color: '#00a3ff', fontSize: '20px' }}>
            {formatCurrency(salesData.todayAmount)} 원
          </div>
          <div className='todaysub'>
            <div className="label">오늘</div>
            <div className="small text-muted">{salesData.todayCount} 건</div>
          </div>
          
        </div>
        <div className="col">
          <div className="amount this-week" style={{ color: '#ff6f6f', fontSize: '20px' }}>
            {formatCurrency(salesData.thisWeekAmount)} 원
          </div>
          <div className='todaysub'>
            <div className="label">이번주</div>
            <div className="small text-muted">{salesData.thisWeekCount} 건</div>
          </div>
        </div>
        <div className="col">
          <div className="amount this-month" style={{ color: '#00a3ff', fontSize: '20px' }}>
            {formatCurrency(salesData.thisMonthAmount)} 원
          </div>
          <div className='todaysub'>
            <div className="label">이번달</div>
            <div className="small text-muted">{salesData.thisMonthCount} 건</div>
          </div>
        </div>
        <div className="col">
          <div className="amount this-year" style={{ color: '#9370db', fontSize: '20px' }}>
            {formatCurrency(salesData.thisYearAmount)} 원
          </div>
          <div className='todaysub'>
            <div className="label">올해</div>
            <div className="small text-muted">{salesData.thisYearCount} 건</div>
          </div>
        </div>
      </div>
    </div>



  );
}

export default SalesStatusSalesTable;
