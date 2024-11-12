import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

function ProductionSidebar() {
    const location = useLocation();  
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);  

    useEffect(() => {
        if (location.pathname === '/') {
            setIsSidebarOpen(false);  
        } else {
            setIsSidebarOpen(true);  
        }
    }, [location]);

    return (
        <div
            className="sidebar" 
            style={{
                position: 'fixed',
                left: isSidebarOpen ? '0' : '-250px', 
                transition: 'left 0.3s ease',
                width: '220px',
                height: '100vh',
                padding: '10px',
                zIndex: 2,
            }}
        >
            <div className="sidebar-menu">
                <div className="dropdown">
                    <button className="menu-item" style={{ backgroundColor: 'lightgray', color: 'black' }}>소요량 관리</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/input8">● 소요량 등록</Link></li>
                        <li><Link to="/production5">● 소요량 조회</Link></li>
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="menu-item" style={{ backgroundColor: 'lightgray', color: 'black' }}>생산 주문 관리</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/input4">● 생산 주문 등록</Link></li>
                        <li><Link to="/production4">● 생산 주문 조회</Link></li>
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="menu-item" style={{ backgroundColor: 'lightgray', color: 'black' }}>생산 계획 관리</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/input3">● 생산 계획 등록</Link></li>
                        <li><Link to="/production3">● 생산 계획 조회</Link></li>
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="menu-item" style={{ backgroundColor: 'lightgray', color: 'black' }}>생산 공정 관리</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/production8">● 생산 현황 모니터링</Link></li>
                        <li><Link to="/produtionmonitering2">● 생산 과정 모니터링</Link></li>
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="menu-item" style={{ backgroundColor: 'lightgray', color: 'black' }}>품질 관리</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/input7">● 품질검사 등록</Link></li>
                        <li><Link to="/production7">● 품질검사 결과조회</Link></li>
                        <li><Link to="/production6">● 불량검사 결과조회</Link></li>
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="menu-item" style={{ backgroundColor: 'lightgray', color: 'black' }}>생산 입고 관리</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/input2">● 생산 입고 등록</Link></li>
                        <li><Link to="/production2">● 생산 입고 조회</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductionSidebar;
