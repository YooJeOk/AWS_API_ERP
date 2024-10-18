import React, { useState } from 'react';

import { ListGroup, Button } from 'react-bootstrap';
import '../../css/SalesManagement/Siderbar.css';

function Sidebar() {
  // 매출 분석 하위 메뉴 표시/숨김 상태
  const [showSalesAnalysisSubmenu, setShowSalesAnalysisSubmenu] = useState(false);

  // 선택된 메뉴 항목 상태
  const [selectedItem, setSelectedItem] = useState('');

  // 매출 분석 하위 항목을 토글하는 함수
  const toggleSubmenu = () => {
    setShowSalesAnalysisSubmenu(!showSalesAnalysisSubmenu);
  };

  // 메뉴 항목 클릭 시 선택된 항목을 설정하는 함수
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <ListGroup className="custom-sidebar">
      {/* 상품 판매 기록 조회 */}
      <ListGroup.Item
        className="custom-sidebar-item"
        style={{
          backgroundColor: selectedItem === 'sales-record' ? '#F0C490' : 'white',
          color: selectedItem === 'sales-record' ? '#703103' : '#703103'
        }}
        onClick={() => handleItemClick('sales-record')}
      >
        상품 판매 기록 조회
      </ListGroup.Item>

      {/* 매출 분석 */}
      <ListGroup.Item
        className="custom-sidebar-item d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: selectedItem === 'sales-analysis' ? '#F0C490' : 'white',
          color: selectedItem === 'sales-analysis' ? '#703103' : '#703103'
        }}
        onClick={() => handleItemClick('sales-analysis')}
      >
        매출 분석
        <Button variant="link" className="p-0" onClick={toggleSubmenu}>
          {showSalesAnalysisSubmenu ? '-' : '+'}
        </Button>
      </ListGroup.Item>

      {/* 매출 분석 하위 메뉴 */}
      {showSalesAnalysisSubmenu && (
        <ListGroup className="custom-sidebar-submenu">
          <ListGroup.Item
            className="custom-sidebar-submenu-item"
            style={{
              backgroundColor: selectedItem === 'sales-status' ? '#F0C490' : 'white',
              color: selectedItem === 'sales-status' ? '#703103' : '#F0C490'
            }}
            onClick={() => handleItemClick('sales-status')}
          >
            매출 현황
          </ListGroup.Item>

          <ListGroup.Item
            className="custom-sidebar-submenu-item"
            style={{
              backgroundColor: selectedItem === 'daily-weekly-monthly-analysis' ? '#F0C490' : 'white',
              color: selectedItem === 'daily-weekly-monthly-analysis' ? '#703103' : '#F0C490'
            }}
            onClick={() => handleItemClick('daily-weekly-monthly-analysis')}
          >
            일/주/월 매출 분석
          </ListGroup.Item>

          <ListGroup.Item
            className="custom-sidebar-submenu-item"
            style={{
              backgroundColor: selectedItem === 'weekday-time-analysis' ? '#F0C490' : 'white',
              color: selectedItem === 'weekday-time-analysis' ? '#703103' : '#F0C490'
            }}
            onClick={() => handleItemClick('weekday-time-analysis')}
          >
            요일별/시간대별 분석
          </ListGroup.Item>

          <ListGroup.Item
            className="custom-sidebar-submenu-item"
            style={{
              backgroundColor: selectedItem === 'product-sales-analysis' ? '#F0C490' : 'white',
              color: selectedItem === 'product-sales-analysis' ? '#703103' : '#F0C490'
            }}
            onClick={() => handleItemClick('product-sales-analysis')}
          >
            제품별 판매 분석
          </ListGroup.Item>
        </ListGroup>
      )}
    </ListGroup>
  );
}

export default Sidebar;
