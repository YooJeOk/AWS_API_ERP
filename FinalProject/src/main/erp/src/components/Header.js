import React from 'react';
import { Link } from 'react-router-dom';  
import './Header.css';  


function Header() {
    return (
        <div className="navbar" >
            <div className="top-section" >
                <img src="logo-black.png" alt="숨쉰당 로고" className="logo" />
                <div className="nav-menu">
                    <div id="main-button" className="nav-button" >
                        <Link to="/"   style={{textDecoration: 'none', color: '#703103' }}>메인 화면</Link>  
                    </div>
                    <div id="production-button" className="nav-button">
                        생산 관리
                        <div className="nav-button-dropdown">
                            <div className="dropdown-content">
                                <Link to="/production4">생산 주문 관리</Link>  
                                <a href="/production8">생산 현황 모니터링</a>
                                <a href="/production5">소요량 관리</a>
                                <a href="/production7">품질 관리</a>
                                <a href="/production2">생산 입고 관리</a>
                           </div>
                        </div>
                    </div>
                    <div id="sales-button" className="nav-button">
                        매출 관리
                        <div className="nav-button-dropdown">
                            <div className="dropdown-content">
                                <a href="/SalesRecord">상품 판매 기록 조회</a>
                                <a href="/SalesStatus">매출 분석</a>
                            </div>
                        </div>
                    </div>
                    <div id="purchase-button" className="nav-button">
                        상품 관리
                        <div className="nav-button-dropdown">
                            <div className="dropdown-content">
                                <a href="/FactoryInventory">재고 관리</a>
                                <a href="/InputOrder">주문 신청</a>
                                <a href="/OrderHistory">주문 내역 관리</a>
                            </div>
                        </div>
                    </div>
                    <div id="inventory-button" className="nav-button">
                        키오스크 관리
                        <div className="nav-button-dropdown">
                            <div className="dropdown-content">
                                <a href='/KioskInventory'>상품 관리</a>
                                <a href="/KioskRegister">상품 등록</a>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="logout-button" className="nav-button logout">로그아웃</button>
            </div>
        </div>
    );
}

export default Header;
