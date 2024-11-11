import React from 'react';
import { Form } from 'react-bootstrap';
import '../../../css/SalesManagement/SearchBar.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PDFIcon from '../../../img/PDF.png';

function SalesDwmAnalysisSearchBar({ tableRef }) {
  const downloadAsPDF = async () => {
    if (!tableRef?.current) {
      console.error('tableRef is not defined or not attached to a DOM element.');
      return;
    }

    try {
      const canvas = await html2canvas(tableRef.current, {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('sales_analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Form inline="true" className="d-flex align-items-center justify-content-between">
      {/* 왼쪽 영역 */}
      <div className="d-flex align-items-center justify-content-between">
        <p className="custom-padding">일/주/월 매출 분석</p>
      </div>

      {/* 오른쪽 영역: PDF 다운로드 버튼 */}
      <div>
        <button
          onClick={downloadAsPDF}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            marginLeft: '10px',
          }}
        >
          <img src={PDFIcon} alt="Download as PDF" style={{ width: '30px', height: '30px' }} />
        </button>
      </div>
    </Form>
  );
}

export default SalesDwmAnalysisSearchBar;
