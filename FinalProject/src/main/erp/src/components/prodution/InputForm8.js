import React, { useState } from 'react';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            ItemID: '',
            ItemType: 'Product',  // 기본값을 Product로 설정
            Size: '',
            MaterialID: '',
            ProductName: '',
            Quantity: '',
            Unit: 'EA',  // 기본값을 EA로 설정
            UnitPrice: '',
            TotalCost: ''
        }
    ]);

    // 필드 상태 업데이트
    const handleChange = (index, e) => {
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            [e.target.name]: e.target.value
        };
        setFormData(newFormData);
    };

    // 수량과 단가가 변경될 때 총 원가를 자동으로 계산
    const calculateTotalCost = (index) => {
        const quantity = parseFloat(formData[index].Quantity) || 0;
        const unitPrice = parseFloat(formData[index].UnitPrice) || 0;
        const newFormData = [...formData];
        newFormData[index].TotalCost = (quantity * unitPrice).toFixed(2);
        setFormData(newFormData);
    };

    // 수량 및 단가가 변경될 때 총 원가 계산
    const handleQuantityOrPriceChange = (index, e) => {
        handleChange(index, e);
        calculateTotalCost(index);
    };

    // 입력 행 추가 기능
    const addRow = () => {
        if (formData.length < 10) {
            setFormData([
                ...formData,
                {
                    ItemID: '',
                    ItemType: 'Product',
                    Size: '',
                    MaterialID: '',
                    ProductName: '',
                    Quantity: '',
                    Unit: 'EA',
                    UnitPrice: '',
                    TotalCost: ''
                }
            ]);
        }
    };

    // 폼 제출 처리
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('MBOM 데이터 제출:', formData);
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>MBOM 등록</h1>
                        <button className="create-button" onClick={addRow} disabled={formData.length >= 10}>재료 추가</button>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit}>
                        <table className="production-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '8%' }}>ItemID(빵&커피)</th>
                                    <th style={{ width: '10%' }}>ItemType</th>
                                    <th style={{ width: '7%' }}>Size</th>
                                    <th style={{ width: '5%' }}>MaterialID</th>
                                    <th style={{ width: '15%' }}>ProductName</th>
                                    <th style={{ width: '10%' }}>Quantity</th>
                                    <th style={{ width: '5%' }}>Unit</th>
                                    <th style={{ width: '15%' }}>UnitPrice</th>
                                    <th style={{ width: '15%' }}>TotalCost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((row, index) => (
                                    <tr key={index}>
                                        <td><input type="text" name="ItemID" value={row.ItemID} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} /></td>
                                        <td>
                                            <select name="ItemType" value={row.ItemType} onChange={(e) => handleChange(index, e)} style={{ width: '100%' }}>
                                                <option value="Product">Product</option>
                                                <option value="Coffee">Coffee</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select name="Size" value={row.Size} onChange={(e) => handleChange(index, e)} disabled={row.ItemType !== 'Coffee'} style={{ width: '100%' }}>
                                                <option value="">선택</option>
                                                <option value="Regular">Regular</option>
                                                <option value="Extra">Extra</option>
                                            </select>
                                        </td>
                                        <td><input type="text" name="MaterialID" value={row.MaterialID} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="ProductName" value={row.ProductName} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="Quantity" value={row.Quantity} onChange={(e) => handleQuantityOrPriceChange(index, e)} required style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="Unit" value={row.Unit} onChange={(e) => handleChange(index, e)} placeholder="EA" style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="UnitPrice" value={row.UnitPrice} onChange={(e) => handleQuantityOrPriceChange(index, e)} required style={{ width: '100%' }} /></td>
                                        <td><input type="text" name="TotalCost" value={row.TotalCost} readOnly style={{ width: '100%' }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="submit" className="submit-button">등록</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default MBOMForm;
