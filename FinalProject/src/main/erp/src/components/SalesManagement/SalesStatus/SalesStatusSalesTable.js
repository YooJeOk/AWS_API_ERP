import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/SalesManagement/SalesStatusSalesTable.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PDFIcon from '../../../img/PDF.png';

function SalesStatusSalesTable({ showpage = true }) {
  const containerRef = useRef(null);
  const pdfIconRef = useRef(null); // PDF 아이콘의 ref 생성

  const downloadAsPDF = async () => {
    if (pdfIconRef.current) pdfIconRef.current.style.display = 'none';

    if (containerRef.current) {
      const canvas = await html2canvas(containerRef.current, {
        scale: window.devicePixelRatio || 2,
        scrollX: 0,
        scrollY: 0,
        useCORS: true, // 외부 이미지가 있을 경우에 필요
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("product_sales_analysis.pdf");
    }

    if (pdfIconRef.current) pdfIconRef.current.style.display = 'block';
  };


  const [salesData, setSalesData] = useState({
    todayAmount: 0,
    todayCount: 0,
    thisWeekAmount: 0,
    thisWeekCount: 0,
    thisMonthAmount: 0,
    thisMonthCount: 0,
    thisYearAmount: 0,
    thisYearCount: 0,
    yesterdayAmount: 0,
    yesterdayCount: 0,
    lastWeekAmount: 0,
    lastWeekCount: 0,
    lastMonthAmount: 0,
    lastMonthCount: 0,
    lastYearAmount: 0,
    lastYearCount: 0,
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
    <div ref={containerRef} className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 이번 기간 데이터 */}
      <div className="SalesStatusSalesTable-box">
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
      {/* 이전 기간 데이터 (showpage가 true일 때만 표시) */}
      {showpage && (
        <div className="SalesStatusSalesTable-box">
          <div className="col">
            <div className="amount today" style={{ color: '#00a3ff', fontSize: '20px' }}>
              {formatCurrency(salesData.yesterdayAmount)} 원
            </div>
            <div className='todaysub'>
              <div className="label">어제</div>
              <div className="small text-muted">{salesData.yesterdayCount} 건</div>
            </div>
          </div>
          <div className="col">
            <div className="amount this-week" style={{ color: '#ff6f6f', fontSize: '20px' }}>
              {formatCurrency(salesData.lastWeekAmount)} 원
            </div>
            <div className='todaysub'>
              <div className="label">지난주</div>
              <div className="small text-muted">{salesData.lastWeekCount} 건</div>
            </div>
          </div>
          <div className="col">
            <div className="amount this-month" style={{ color: '#00a3ff', fontSize: '20px' }}>
              {formatCurrency(salesData.lastMonthAmount)} 원
            </div>
            <div className='todaysub'>
              <div className="label">지난달</div>
              <div className="small text-muted">{salesData.lastMonthCount} 건</div>
            </div>
          </div>
          <div className="col">
            <div className="amount this-year" style={{ color: '#9370db', fontSize: '20px' }}>
              {formatCurrency(salesData.lastYearAmount)} 원
            </div>
            <div className='todaysub'>
              <div className="label">작년</div>
              <div className="small text-muted">{salesData.lastYearCount} 건</div>
            </div>
          </div>
        </div>
      )}
      {showpage && (
     <button
        onClick={downloadAsPDF}
        style={{ border: 'none', outline: 'none', background: 'transparent', marginLeft: 'auto' }}
        ref={pdfIconRef} // PDF 아이콘의 ref 연결
      >
        <img src={PDFIcon} alt="Download as PDF" style={{ width: '45px', height: '45px' }} />
      </button>
      )}
    </div>
  );
}

export default SalesStatusSalesTable;
