import React from 'react';
import { Button } from 'react-bootstrap';
import '../../../css/SalesManagement/SalesDwtdAnalysisActionButtons.css'

function ActionButtons() {
  return (
    <div className="text-right" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="primary" className="mr-2 custom-button">인쇄</Button>
      <Button variant="secondary" className="custom-button">Excel</Button>
    </div>
  );
}

export default ActionButtons;
