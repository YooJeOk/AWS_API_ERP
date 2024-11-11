import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Routes, Route } from 'react-router-dom';
import InputForm8 from './InputForm8';
import './ProductionPage.css';

function ProductionTable() {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [quantity, setQuantity] = useState(1); // 초기 수량을 1로 설정
    const [customInput, setCustomInput] = useState(false);
    const [customQuantity, setCustomQuantity] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/mbom/all-with-material-name');
                if (response.status === 200) {
                    console.log("Received data:", response.data);
                    setData(response.data);
                    setCustomInput(true);
                } else {
                    console.error("데이터 불러오기 실패:", response.status);
                }
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        setQuantity(1); // 선택된 품목이 변경될 때마다 수량을 1로 설정
        setCustomQuantity(""); // 커스텀 수량 초기화
    }, [selectedItem]);

    const filteredData = data
        .filter(item => item.itemType === (category === "빵" ? "Product" : category === "커피" ? "Coffee" : ""))
        .filter(item => item.productName === selectedItem);

    const totalCost = filteredData.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity * (quantity || customQuantity || 1),
        0
    );

    const getItemsByCategory = () => {
        return [...new Set(
            data.filter(item => item.itemType === (category === "빵" ? "Product" : category === "커피" ? "Coffee" : ""))
                .map(item => item.productName)
        )];
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value === "직접 입력") {
            setCustomInput(true);
            setQuantity("");
        } else {
            setCustomInput(false);
            setQuantity(parseInt(value));
            setCustomQuantity("");
        }
    };

    const handleCustomQuantityChange = (e) => {
        const value = e.target.value;
        if (value >= 1 && value <= 1000) {
            setCustomQuantity(parseInt(value));
            setQuantity("");
        }
    };

    const handleDeleteSelectedItem = async () => {
        if (!selectedItem) {
            alert("삭제할 생산 품목을 선택해 주세요.");
            return;
        }
        if (window.confirm(`${selectedItem}에 해당하는 모든 데이터를 삭제하시겠습니까?`)) {
            try {
                await axios.delete(`http://localhost:8080/api/mbom/delete-by-product-name`, {
                    data: { productName: selectedItem }
                });
                setData(data.filter(item => item.productName !== selectedItem));
                alert(`${selectedItem} 삭제되었습니다.`);
                setSelectedItem("");
            } catch (error) {
                console.error("삭제 실패:", error);
                alert("삭제 실패");
            }
        }
    };

    const getImagePath = () => {
        if (category === "빵") {
            return `/images/bread/${selectedItem}.jpg`; // public 폴더 아래 경로 설정
        } else if (category === "커피") {
            return `/images/coffee/${selectedItem}.jpg`;
        }
        return "";
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <h1  className="custom-padding" style={{ fontSize: '26px', margin: 0 }}>소요량 조회</h1>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                className="create-button" 
                                onClick={() => navigate('/input8')} 
                                
                            >
                                생성
                            </button>
                            <button 
                                className="delete-button" 
                                onClick={handleDeleteSelectedItem} 
                                style={{ fontSize: '20px', backgroundColor: '#FF6B6B', color: '#fff', padding: '5px 30px', border: 'none', borderRadius: '5px' }}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                    <div 
                        className="selection-container" 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            width: '95%',
                            margin: '0 auto',
                            fontSize: '22px',
                            marginTop: '30px',
                            marginBottom: '30px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <label>카테고리:</label>
                            <select 
                                value={category} 
                                onChange={(e) => { 
                                    setCategory(e.target.value); 
                                    setSelectedItem(""); 
                                }}
                                style={{ fontSize: '20px', width: '130px' }}
                            >
                                <option value="">카테고리</option>
                                <option value="빵">빵</option>
                                <option value="커피">커피</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <label>생산 품목:</label>
                            <select 
                                value={selectedItem} 
                                onChange={(e) => setSelectedItem(e.target.value)} 
                                style={{ fontSize: '20px', width: '220px' }}
                                disabled={!category}
                            >
                                <option value="">{category ? "생산 품목" : "카테고리를 선택하세요"}</option>
                                {category && getItemsByCategory().map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '170px' }}>
                            <label style={{ width: '100px', display: 'inline-block' }}>수량:</label>
                            {customInput ? (
                                <input 
                                    type="number" 
                                    value={customQuantity} 
                                    onChange={handleCustomQuantityChange} 
                                    placeholder="1~1000" 
                                    style={{ fontSize: '20px', width: '100%' }}
                                    min="1"
                                    max="1000"
                                    onBlur={() => setCustomInput(false)}
                                />
                            ) : (
                                <select 
                                    value={quantity || "1"} 
                                    onChange={handleQuantityChange}
                                    style={{ fontSize: '20px', width: '100%' }}
                                    disabled={!selectedItem}
                                >
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="150">150</option>
                                    <option value="200">200</option>
                                    <option value="직접 입력">직접 입력</option>
                                </select>
                            )}
                        </div>
                    </div>
                    <div className="production-display" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="production-table-container" style={{ width: "60%", marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '24px' }}>{selectedItem || "생산 품목을 선택하세요"}</h2>
                            <table className="table production-table" style={{ tableLayout: 'fixed', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>소모 품목</th>
                                        <th>소모량</th>
                                        <th>단위</th>
                                        <th>단가</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.materialName}</td>
                                                <td>{row.quantity * (quantity || customQuantity)}</td>
                                                <td>{row.unit}</td>
                                                <td>{row.unitPrice}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>등록된 데이터가 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>
                                            총 원가: {totalCost} 원
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="sample-image" style={{ 
                            width: "50%", 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            textAlign: 'center', 
                            padding: '120px', 
                            height: '500px', 
                            position: 'relative',
                            marginBottom: '70px' 
                        }}>
                            {selectedItem ? (
                                <img src={getImagePath()} alt={selectedItem} style={{ width: "100%", height: "auto" }} />
                            ) : (
                                <p style={{ fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                    생산 품목을 선택하면 견본 이미지가 표시됩니다.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route path="/input8" element={<InputForm8 />} />
                </Routes>
            </main>
        </div>
    );
}

export default ProductionTable;
