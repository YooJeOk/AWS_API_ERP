import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductionSidebar from './components/ProductionSidebar';
import SalesSidebar from './components/SalesSidebar';  // SalesSidebar 추가
import InputForm2 from './components/prodution/InputForm2';
import InputForm3 from './components/prodution/InputForm3';
import InputForm4 from './components/prodution/InputForm4';
import ProductionPage2 from './components/prodution/ProductionPage2';  
import ProductionPage3 from './components/prodution/ProductionPage3';
import ProductionPage4 from './components/prodution/ProductionPage4';
import ProductionPage8 from './components/prodution/ProductionPage8';  // 모니터링
import InputForm8 from './components/prodution/InputForm8';
import ProductionPage5 from './components/prodution/ProductionPage5';
import InputForm6 from './components/prodution/InputForm6';
import ProductionPage6 from './components/prodution/ProductionPage6';
import InputForm7 from './components/prodution/InputForm7';
import ProductionPage7 from './components/prodution/ProductionPage7';
import Produtionmonitering2 from './components/prodution/produtionmonitering2';
import MainPage from './components/MainPage';

//매출관리 섹터
import SalesRecord from './pages/SalesManagement/SalesRecord';
import SalesDwmAnalysis from '../../erp/src/pages/SalesManagement/SalesDwmAnalysis';
import SalesDwtdAnalysis from '../../erp/src/pages/SalesManagement/SalesDwtdAnalysis';
import SalesProductAnalysis from '../../erp/src/pages/SalesManagement/SalesProductAnalysis';
import SalesStatus from '../../erp/src/pages/SalesManagement/SalesStatus';

//상품 관리
import InvenSidebar from './components/InventoryManage/InvenSidebar';
import StoreInventory from './pages/InventoryManage/StoreInventory';
import FactoryInventory from './pages/InventoryManage/FactoryInventory';
import InputOrder from './pages/InventoryManage/InputOrder';
import OrderHistory from './pages/InventoryManage/OrderHistory';
import OrderComplete from './pages/InventoryManage/OrderComplete';

//키오스크 관리
import KioskSidebar from './components/KioskManagement/KioskSidebar';
import KioskInventory from './pages/KioskManagement/KioskInventory';
import KioskRegister from './pages/KioskManagement/KioskRegister';

//로그인
import Login from './components/로그인/login';
import Findpassword from './components/로그인/findpassword';

function App() {
    return (
        <Router>
            <Header />
            <div className="custom-container">
                {/* 생산 관리 경로에만 ProductionSidebar 사용 */}
                 
                <Routes>
                    {/* 메인 페이지 */}
                    {/* <Route path="/" element={<MainPage />} /> */}
                    <Route path="/" element={<Login />} />
                    <Route path="/find" element={<Findpassword />} />


                    {/* 생산 관리 페이지들 */}
                    
                    <Route path="/input2" element={<ProductionSidebarWrapper><InputForm2 /></ProductionSidebarWrapper>} />
                    <Route path="/production2/*" element={<ProductionSidebarWrapper><ProductionPage2 /></ProductionSidebarWrapper>} />
                    <Route path="/input3" element={<ProductionSidebarWrapper><InputForm3 /></ProductionSidebarWrapper>} />
                    <Route path="/production3/*" element={<ProductionSidebarWrapper><ProductionPage3 /></ProductionSidebarWrapper>} />
                    <Route path="/input4" element={<ProductionSidebarWrapper><InputForm4 /></ProductionSidebarWrapper>} />
                    <Route path="/production4/*" element={<ProductionSidebarWrapper><ProductionPage4 /></ProductionSidebarWrapper>} />
                    <Route path="/production8" element={<ProductionSidebarWrapper><ProductionPage8 /></ProductionSidebarWrapper>} />
                    <Route path="/input8" element={<ProductionSidebarWrapper><InputForm8 /></ProductionSidebarWrapper>} />
                    <Route path="/production5/*" element={<ProductionSidebarWrapper><ProductionPage5 /></ProductionSidebarWrapper>} />
                    <Route path="/input6" element={<ProductionSidebarWrapper><InputForm6 /></ProductionSidebarWrapper>} />
                    <Route path="/production6/*" element={<ProductionSidebarWrapper><ProductionPage6 /></ProductionSidebarWrapper>} />
                    <Route path="/input7" element={<ProductionSidebarWrapper><InputForm7 /></ProductionSidebarWrapper>} />
                    <Route path="/production7/*" element={<ProductionSidebarWrapper><ProductionPage7 /></ProductionSidebarWrapper>} />
                    <Route path="/produtionmonitering2/" element={<ProductionSidebarWrapper><Produtionmonitering2 /></ProductionSidebarWrapper>} />

                    {/* 매출 관리 페이지들에 SalesSidebar 사용 */}
                    <Route path="/SalesRecord" element={<SalesSidebarWrapper><SalesRecord /></SalesSidebarWrapper>} />
                    <Route path="/SalesDwmAnalysis" element={<SalesSidebarWrapper><SalesDwmAnalysis /></SalesSidebarWrapper>} />
                    <Route path="/SalesDwtdAnalysis" element={<SalesSidebarWrapper><SalesDwtdAnalysis /></SalesSidebarWrapper>} />
                    <Route path="/SalesProductAnalysis" element={<SalesSidebarWrapper><SalesProductAnalysis /></SalesSidebarWrapper>} />
                    <Route path="/SalesStatus" element={<SalesSidebarWrapper><SalesStatus /></SalesSidebarWrapper>} />

                    {/* 상품 관리 탭 */}
                    <Route path="/FactoryInventory" element={<InvenSidebarWrapper><FactoryInventory /></InvenSidebarWrapper>} />
                    <Route path="/StoreInventory" element={<InvenSidebarWrapper><StoreInventory /></InvenSidebarWrapper>} />
                    <Route path="/InputOrder" element={<InvenSidebarWrapper><InputOrder /></InvenSidebarWrapper>} />
                    <Route path="/OrderHistory" element={<InvenSidebarWrapper><OrderHistory /></InvenSidebarWrapper>} />
                    <Route path="/OrderComplete" element={<InvenSidebarWrapper><OrderComplete /></InvenSidebarWrapper>} />

                    
                    
                    
                    {/* 키오스크 관리 사이드바 */}
                    <Route path="/KioskInventory" element={<KioskSidebarWrapper><KioskInventory /></KioskSidebarWrapper>} />
                    <Route path="/KioskRegister" element={<KioskSidebarWrapper><KioskRegister /></KioskSidebarWrapper>} />

                    
                </Routes>
            </div>
        </Router>
    );
}

// Wrapper 컴포넌트: ProductionSidebar를 생산 관리 페이지에 적용
const ProductionSidebarWrapper = ({ children }) => (
    <div className="main-content" style={{ padding: '0%' }}>
        <ProductionSidebar />
        {children}
    </div>
);

// Wrapper 컴포넌트: SalesSidebar를 매출 관리 페이지에 적용
const SalesSidebarWrapper = ({ children }) => (
    <div className="main-content" style={{ padding: '0%' }}>
        <SalesSidebar />
        {children}
    </div>
);

// Wrapper 컴포넌트: InvenSidebar를 키오스크 관리 페이지에 적용
const InvenSidebarWrapper = ({ children }) => (
    <div className="main-content" style={{ padding: '0%' }}>
        <InvenSidebar />
        {children}
    </div>
);

// Wrapper 컴포넌트: KioskSidebar를 키오스크 관리 페이지에 적용
const KioskSidebarWrapper = ({ children }) => (
    <div className="main-content" style={{ padding: '0%' }}>
        <KioskSidebar />
        {children}
    </div>
);

export default App;
