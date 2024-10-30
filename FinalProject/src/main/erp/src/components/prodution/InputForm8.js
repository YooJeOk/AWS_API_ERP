import React, { useState } from 'react';
import axios from 'axios';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState([
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

    // 필드 상태 업데이트 및 총 원가 자동 계산
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            [name]: name === 'Quantity' || name === 'UnitPrice' ? parseFloat(value) || '' : value
        };
        
        if (name === 'Quantity' || name === 'UnitPrice') {
            const quantity = parseFloat(newFormData[index].Quantity) || 0;
            const unitPrice = parseFloat(newFormData[index].UnitPrice) || 0;
            newFormData[index].TotalCost = (quantity * unitPrice).toFixed(2);
        }
        
        setFormData(newFormData);
    };

    // 숫자와 소수점만 입력되도록 제한하는 함수
    const restrictNumericInput = (e) => {
        const value = e.target.value;
        // 숫자와 소수점 외의 문자 제거
        e.target.value = value.replace(/[^0-9.]/g, '');
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8080/api/MBOM', formData[0]);
            
            if (response.status === 200) {
                console.log('생산 주문이 성공적으로 등록되었습니다:', response.data);
                setFormData([
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
            } else {
                console.error('생산 주문 등록 실패:', response.status);
            }
        } catch (error) {
            console.error('서버로 데이터 전송 중 오류 발생:', error);
        }
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
                                        <td><input type="number" name="Quantity" value={row.Quantity} onInput={restrictNumericInput} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} min="0" step="0.1" /></td>
                                        <td>
                                            <select name="Unit" value={row.Unit} onChange={(e) => handleChange(index, e)} style={{ width: '100%' }}>
                                                <option value="ml">ml</option>
                                                <option value="g">g</option>
                                            </select>
                                        </td>
                                        <td><input type="number" name="UnitPrice" value={row.UnitPrice} onInput={restrictNumericInput} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }} min="0" step="0.1" /></td>
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
