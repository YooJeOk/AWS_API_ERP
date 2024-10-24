import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductionSidebar from './components/ProductionSidebar';
import InputForm from './components/prodution/InputForm';  
import ElasticsearchDataPage from './components/prodution/ElasticsearchDataPage';  // 추가된 컴포넌트
import InputForm2 from './components/prodution/InputForm2';  // 추가
import ProductionPage2 from './components/prodution/ProductionPage2';  // 추가

// 매출관리 섹터
import SalesRecord from './pages/SalesManagement/SalesRecord';
import DwmAnalysis from '../../erp/src/pages/SalesManagement/DwmAnalysis';
import DwtdAnalysis from '../../erp/src/pages/SalesManagement/DwtdAnalysis';
import ProductSalesAnalysis from '../../erp/src/pages/SalesManagement/ProductSalesAnalysis';
import SalesStatus from '../../erp/src/pages/SalesManagement/SalesStatus';


function App() {
    return (
        <Router>
            <Header />
            <div className="custom-container" >
                <ProductionSidebar />
                <div className="main-content" style={{ padding: '0%' }}>
                    <Routes>
                        {/* 메인 페이지 */}
                        <Route path="/" element={<div>Main Page Content</div>} />
                        
                        {/* 생산 계획 관리 - Elasticsearch 데이터 페이지 임시 테스트 */}
                        <Route path="/input" element={<InputForm />} />
                        <Route path="/production" element={<ElasticsearchDataPage />} />  {/* 임시로 여기에 추가 */}
                        
                        {/* 생산 공정 관리 */}
                        <Route path="/input2" element={<InputForm2 />} />
                        <Route path="/production2" element={<ProductionPage2 />} />
                        
                        {/* 나머지 라우트 설정은 그대로 유지 */}
                        
                        {/* 매출 관리 */}
                        <Route path="/SalesRecord" element={<SalesRecord />} />
                        <Route path="/DwmAnalysis" element={<DwmAnalysis />} />
                        <Route path="/DwtdAnalysis" element={<DwtdAnalysis />} />
                        <Route path="/ProductSalesAnalysis" element={<ProductSalesAnalysis />} />
                        <Route path="/SalesStatus" element={<SalesStatus />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
