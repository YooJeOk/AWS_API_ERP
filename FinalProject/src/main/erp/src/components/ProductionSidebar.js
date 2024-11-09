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
                left: isSidebarOpen ? '0' : '-250px', 
                transition: 'left 0.3s ease',
                width: '220px',
                height: '100vh',
                padding: '10px',
                zIndex: 2,
                
            }}
        >
            <div className="sidebar-menu" >
                <div className="dropdown">
                <button className="menu-item" style={{backgroundColor: '#F0C490', color:'white'}}>소요량 관리</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/input8">● 소요량 등록</Link></li>
                        <li><Link to="/production5">● 소요량 조회</Link></li>
                    </ul>
                </div>

                <div className="dropdown">
                <button className="menu-item" style={{backgroundColor: '#F0C490', color:'white'}}>생산 주문 관리</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/input4">● 생산 주문 등록</Link></li>
                        <li><Link to="/production4">● 생산 주문 조회</Link></li>
                    </ul>
                </div>

                <div className="dropdown">
                <button className="menu-item" style={{backgroundColor: '#F0C490', color:'white'}}>생산 계획 관리</button>
                    <ul className="dropdown-menu">
                        
                        
                        
                        <li><Link to="/input3">● 생산 계획 등록</Link></li>
                        <li><Link to="/production3">● 생산 계획 조회</Link></li>
                        
                    </ul>
                </div>
                <div className="dropdown">
                <button className="menu-item" style={{backgroundColor: '#F0C490', color:'white'}}>생산 공정 관리</button>
                    <ul className="dropdown-menu">
                        
                        
                        <li><Link to="/production8">● 생산 현황 모니터링</Link></li>
                        <li><Link to="/produtionmonitering2">● 생산 과정 모니터링</Link></li>
                        
                        
                    </ul>
                </div>



               <div className="dropdown">
                <button className="menu-item" style={{backgroundColor: '#F0C490', color:'white'}}>품질 관리</button>
                    <ul className="dropdown-menu">
                        <li><Link to="/input7">● 품질검사 등록</Link></li>
                        <li><Link to="/production7">● 품질검사 조회</Link></li>
                        <li><Link to="/input6">● 불량 등록</Link></li>
                        <li><Link to="/production6">● 불량 조회</Link></li>
                    </ul>
                </div>


                <div className="dropdown">
                <button className="menu-item" style={{backgroundColor: '#F0C490', color:'white'}}>생산 입고 관리</button>
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
