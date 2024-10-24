import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

function ProductionSidebar() {
    const location = useLocation();  // 현재 경로를 가져옴
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // 사이드바 상태 관리

    // 경로 변경에 따라 사이드바 열림/닫힘 상태를 변경하는 useEffect
    useEffect(() => {
        if (location.pathname === '/') {
            setIsSidebarOpen(false);  // 메인 페이지에서는 사이드바를 닫음
        } else {
            setIsSidebarOpen(true);  // 다른 페이지에서는 사이드바를 염
        }
    }, [location]);

    return (
        <div
            className="sidebar" 
            style={{
                position: 'fixed',
                left: isSidebarOpen ? '0' : '-250px',  // 열리면 0, 닫히면 -250px
                transition: 'left 0.3s ease',
                width: '220px',
                height: '100vh',
                padding: '10px',
                zIndex: 2,
                backgroundColor: '#F6F6F6'
            }}
        >
            <div className="sidebar-menu" >
                <div className="dropdown">
                <Link to="/SalesRecord">
      <button className="menu-item" style={{ backgroundColor: '#F0C490', color: 'white' }}>
        상품 판매 기록 조회
      </button>
    </Link>
                </div>

                <div className="dropdown">
                    <button className="menu-item" style={{backgroundColor: '#F0C490', color:'white'}}>매출 분석</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/SalesStatus">● 매출현황</Link></li>
                        <li><Link to="/SalesDwmAnalysis">● 일/주/월 매출 분석</Link></li>
                        <li><Link to="/SalesDwtdAnalysis">● 요일별/시간대별 분석</Link></li>
                        <li><Link to="/SalesProductAnalysis">● 제품별 판매 분석</Link></li>
                    </ul>
                </div>


            </div>
        </div>
    );
}

export default ProductionSidebar;
