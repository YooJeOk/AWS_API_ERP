import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

function KioskSidebar() {
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
                    <Link to="/KioskInventory">
                        <button className="menu-item" style={{ backgroundColor: '#F0C490', color: 'white' }}>상품 관리</button>
                    </Link>
                </div>

                <div className="dropdown">
                    <Link to="/KioskRegister">
                        <button className="menu-item" style={{ backgroundColor: '#F0C490', color: 'white' }}>
                            상품 등록
                        </button>
                    </Link>
                </div>




            </div>
        </div>
    );
}

export default KioskSidebar;
