import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/SalesManagement/SalesStatusSalesTable.css';

function SalesStatusSalesTable() {
  return (
    <div className="container">
    <div className="row SalesStatusSalesTable-box">
      <div className="col">
        <div className="amount today" style={{color: '#00a3ff', fontSize: '20px'}}>0 원</div>
        <div className='todaysub'>
        <div className="label">오늘</div>
        <div className="small text-muted">0 건</div>
        </div>
      </div>
      <div className="col">
        <div className="amount this-week" style={{color: '#ff6f6f', fontSize: '20px'}}>4,115,000 원</div>
        <div className='todaysub'>
        <div className="label">이번주</div>
        <div className="small text-muted">38 건</div>
        </div>
      </div>
      <div className="col">
        <div className="amount this-month" style={{color: '#00a3ff', fontSize: '20px'}}>67,913,756 원</div>
        <div className='todaysub'>
        <div className="label">이번달</div>
        <div className="small text-muted">635 건</div>
        </div>
      </div>
      <div className="col">
        <div className="amount this-year" style={{color: '#9370db', fontSize: '20px'}}>245,562,340 원</div>
        <div className='todaysub'>
        <div className="label">올해</div>
        <div className="small text-muted">2,167 건</div>
        </div>
      </div>
    </div>
    </div>
);
}

export default SalesStatusSalesTable;
