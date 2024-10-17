import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductionSidebar from './components/ProductionSidebar';
import InputForm from './components/InputForm';  
import InputForm2 from './components/InputForm2';
import InputForm3 from './components/InputForm3'; // 추가된 컴포넌트들
import InputForm4 from './components/InputForm4';
import InputForm5 from './components/InputForm5';
import ProductionPage from './components/ProductionPage';
import ProductionPage2 from './components/ProductionPage2';  
import ProductionPage3 from './components/ProductionPage3';
import ProductionPage4 from './components/ProductionPage4';
import ProductionPage8 from './components/ProductionPage8';  // 모니터링
import InputForm8 from './components/InputForm8';
import ProductionPage5 from './components/ProductionPage5';
import InputForm6 from './components/InputForm6';
import ProductionPage6 from './components/ProductionPage6';
import InputForm7 from './components/InputForm7';
import ProductionPage7 from './components/ProductionPage7';
import InputForm9 from './components/InputForm9';
import ProductionPage9 from './components/ProductionPage9'; // 날짜별 가동율 실적

function App() {
    return (
        <Router>
            <Header />
            <div className="custom-container" style={{ display: 'flex' }}>
                <ProductionSidebar />
                <div className="main-content">
                    <Routes>
                        {/* 메인 페이지 */}
                        <Route path="/" element={<div>Main Page Content</div>} />
                        
                        {/* 생산 계획 관리 */}
                        <Route path="/input" element={<InputForm />} />
                        <Route path="/production" element={<ProductionPage />} />

                        {/* 생산 공정 관리 */}
                        <Route path="/input2" element={<InputForm2 />} />
                        <Route path="/production2" element={<ProductionPage2 />} />
                        <Route path="/input3" element={<InputForm3 />} />
                        <Route path="/production3" element={<ProductionPage3 />} />
                        <Route path="/input4" element={<InputForm4 />} />
                        <Route path="/production4" element={<ProductionPage4 />} />
                        <Route path="/production8" element={<ProductionPage8 />} />

                        {/* 소요량 관리 */}
                        <Route path="/input8" element={<InputForm8 />} />
                        <Route path="/input5" element={<InputForm5 />} />
                        <Route path="/production5" element={<ProductionPage5 />} />

                        {/* 품질 관리 */}
                        <Route path="/input6" element={<InputForm6 />} />
                        <Route path="/production6" element={<ProductionPage6 />} />
                        <Route path="/input7" element={<InputForm7 />} />
                        <Route path="/production7" element={<ProductionPage7 />} />

                        {/* 생산실적 관리 */}
                        <Route path="/input9" element={<InputForm9 />} />
                        <Route path="/production9" element={<ProductionPage9 />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
