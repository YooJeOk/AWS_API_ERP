import React, { useState } from 'react';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            MaterialID: '',
            Quantity: '',
            Unit: 'EA',
            UnitPrice: '',
            TotalCost: ''
        }
    ]);

    const [fixedData, setFixedData] = useState({
        ItemID: '',
        ItemType: 'Product',
        ProductName: '',
        Size: ''
    });

    const handleChange = (index, e) => {
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            [e.target.name]: e.target.value
        };
        setFormData(newFormData);
    };

    const calculateTotalCost = (index) => {
        const quantity = parseFloat(formData[index].Quantity) || 0;
        const unitPrice = parseFloat(formData[index].UnitPrice) || 0;
        const newFormData = [...formData];
        newFormData[index].TotalCost = (quantity * unitPrice).toFixed(2);
        setFormData(newFormData);
    };

    const handleQuantityOrPriceChange = (index, e) => {
        handleChange(index, e);
        calculateTotalCost(index);
    };

    const handleFixedChange = (e) => {
        setFixedData({
            ...fixedData,
            [e.target.name]: e.target.value
        });
    };

    const addRow = () => {
        if (formData.length < 15) { // 최대 15개의 행까지 추가 가능
            setFormData([
                ...formData,
                {
                    MaterialID: '',
                    Quantity: '',
                    Unit: 'EA',
                    UnitPrice: '',
                    TotalCost: ''
                }
            ]);
        }
    };

    const deleteRow = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
    };

    const getTotalCostSum = () => {
        return formData.reduce((sum, row) => sum + parseFloat(row.TotalCost || 0), 0).toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('MBOM 데이터 제출:', { ...fixedData, materials: formData });
    };

    return (
        <div className="custom-container" style={{ minHeight: '90vh', overflow: 'hidden' }}>
            <aside id="sidebar"></aside>
            <main className="production-content" style={{ padding: '0 50px' }}>
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>MBOM 등록</h1>
                    </div>

                    {/* 상단 고정 필드와 총원가 박스, 재료 추가 버튼 및 등록 버튼 */}
                    <div className="fixed-section" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <table className="production-table" style={{ width: '60%' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '25%' }}>상품ID</th>
                                    <th style={{ width: '25%' }}>상품유형</th>
                                    <th style={{ width: '25%' }}>상품명</th>
                                    <th style={{ width: '25%' }}>사이즈</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" name="ItemID" value={fixedData.ItemID} onChange={handleFixedChange} required style={{ width: '100%' }} /></td>
                                    <td>
                                        <select name="ItemType" value={fixedData.ItemType} onChange={handleFixedChange} style={{ width: '100%' }}>
                                            <option value="Product">Product</option>
                                            <option value="Coffee">Coffee</option>
                                        </select>
                                    </td>
                                    <td><input type="text" name="ProductName" value={fixedData.ProductName} onChange={handleFixedChange} required style={{ width: '100%' }} /></td>
                                    <td>
                                        <select name="Size" value={fixedData.Size} onChange={handleFixedChange} disabled={fixedData.ItemType !== 'Coffee'} style={{ width: '100%' }}>
                                            <option value="">선택</option>
                                            <option value="Regular">Regular</option>
                                            <option value="Extra">Extra</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div style={{
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            minWidth: '240px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            height: '88px'
                        }}>
                            총원가
                            <hr style={{ margin: '10px 0', borderTop: '1px solid #ddd' }} /> {/* 가로줄 추가 */}
                            {getTotalCostSum()} 원
                        </div>

                        <button className="create-button" onClick={addRow} style={{ minWidth: '100px' }}>재료 추가</button>
                        <button className="create-button" onClick={handleSubmit} style={{ minWidth: '100px' }}>등록</button>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                        {/* 재료 입력 테이블 */}
                        <div style={{ flex: '1', maxHeight: '600px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px' }}>
                            <table className="production-table" style={{ width: '100%', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}></th>
                                        <th style={{ width: '10%' }}>재료ID</th>
                                        <th style={{ width: '10%' }}>수량</th>
                                        <th style={{ width: '5%' }}>규격</th>
                                        <th style={{ width: '15%' }}>단가</th>
                                        <th style={{ width: '15%' }}>총단가</th>
                                    </tr>
                                </thead>
                            </table>
                            <table className="production-table" style={{ width: '100%' }}>
                                <tbody>
                                    {formData.map((row, index) => (
                                        <tr key={index}>
                                            <td><button onClick={() => deleteRow(index)} style={{ color: 'red', fontSize: '1.2em', background: 'none', border: 'none', cursor: 'pointer' }}>×</button></td>
                                            <td><input type="text" name="MaterialID" value={row.MaterialID} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} /></td>
                                            <td><input type="text" name="Quantity" value={row.Quantity} onChange={(e) => handleQuantityOrPriceChange(index, e)} required style={{ width: '100%' }} /></td>
                                            <td><input type="text" name="Unit" value={row.Unit} onChange={(e) => handleChange(index, e)} placeholder="EA" style={{ width: '100%' }} /></td>
                                            <td><input type="text" name="UnitPrice" value={row.UnitPrice} onChange={(e) => handleQuantityOrPriceChange(index, e)} required style={{ width: '100%' }} /></td>
                                            <td><input type="text" name="TotalCost" value={row.TotalCost} readOnly style={{ width: '100%' }} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 오른쪽 재료 목록 섹션 */}
                        <div style={{ flex: '1', maxHeight: '600px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}>
                            <h3>재료 목록</h3>
                            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9em' }}>
                                {`
-- 빵 관련 식자재
(1, '계란', '식자재', 'g', 4, '2024-04-05 10:30:00'),          
(1, '고구마필링', '식자재', 'g', 8, '2024-04-05 10:35:00'),    
...

-- 커피 재료
(2, '원두(에스프레소)', '식자재', 'g', 20, '2024-04-06 09:00:00'),     
(2, '카라멜시럽', '식자재', 'ml', 15, '2024-04-06 09:10:00'),        
...

-- 부자재
(3, '포장지', '포장재', '개', 20, '2024-04-06 11:00:00'),
(3, '컵(regular size)', '부자재', '개', 70, '2024-04-06 11:10:00'),
...





































                                `}
                            </pre>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MBOMForm;
