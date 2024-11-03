import React, { useState, useEffect } from 'react';
import './production.css';
import Pagination from '../InventoryManage/Pagination';

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

    const [materialList, setMaterialList] = useState([]);
    const [page, setPage] = useState(0);
    const size = 10;


    useEffect(() => {
        fetch(`/api/factory/inventory/materials?page=${page}&size=${size}`)
            .then(response => response.json())
            .then(data => setMaterialList(data.content))
            .catch(error => console.error('Error fetching material list:', error));
    }, [page]);


    useEffect(() => {
        if (fixedData.ItemType && fixedData.Size) {
            fetch(`/api/mbom/next-item-id?itemType=${fixedData.ItemType}&size=${fixedData.Size}`)
                .then(response => response.json())
                .then(nextItemID => setFixedData(prevData => ({ ...prevData, ItemID: nextItemID })))
                .catch(error => console.error('Error fetching next ItemID:', error));
        }
    }, [fixedData.ItemType, fixedData.Size]);

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
        if (formData.length < 15) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/mbom/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...fixedData, materials: formData }),
            });
            if (response.ok) {
                alert("MBOM 데이터가 성공적으로 저장되었습니다.");
            } else {
                alert("데이터 저장 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    //공장 재고
    const [materialInventory, setMaterialInventory] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/api/factory/inventory/materials?page=${page}&size=5`)
            .then(response => response.json())
            .then(data => {
                setMaterialList(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching material list:', error));
    }, [page, size]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="custom-container" style={{ minHeight: '90vh', overflow: 'hidden' }}>
            <aside id="sidebar"></aside>
            <main className="production-content" style={{ padding: '0 50px' }}>
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>MBOM 등록</h1>
                    </div>

                    <div className="fixed-section" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <table className="production-table" style={{ width: '60%' }}>
                            <thead>
                                <tr>
                                    <th>상품ID</th>
                                    <th>상품유형</th>
                                    <th>상품명</th>
                                    <th>사이즈</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" name="ItemID" value={fixedData.ItemID} readOnly style={{ width: '100%' }} /></td>
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

                        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '4px', minWidth: '240px', textAlign: 'center', fontWeight: 'bold', height: '88px' }}>
                            총원가
                            <hr style={{ margin: '10px 0', borderTop: '1px solid #ddd' }} />
                            {getTotalCostSum()} 원
                        </div>

                        <button className="create-button" onClick={addRow} style={{ minWidth: '100px' }}>재료 추가</button>
                        <button className="create-button" onClick={handleSubmit} style={{ minWidth: '100px' }}>등록</button>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                        <div style={{ flex: '1', maxHeight: '600px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px' }}>
                            <table className="production-table" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>재료ID</th>
                                        <th>수량</th>
                                        <th>규격</th>
                                        <th>단가</th>
                                        <th>총단가</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.map((row, index) => (
                                        <tr key={index}>
                                            <td><button onClick={() => deleteRow(index)} style={{ color: 'red', fontSize: '1.2em', background: 'none', border: 'none', cursor: 'pointer' }}>×</button></td>
                                            <td>
                                                <select name="MaterialID" value={row.MaterialID} onChange={(e) => handleChange(index, e)} required style={{ width: '100%' }}>
                                                    <option value="">선택</option>
                                                    {materialList.map(material => (
                                                        <option key={material.materialId} value={material.materialId}>
                                                            {material.materialId} - {material.materialName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td><input type="text" name="Quantity" value={row.Quantity} onChange={(e) => handleQuantityOrPriceChange(index, e)} required style={{ width: '100%' }} /></td>
                                            <td><input type="text" name="Unit" value={row.Unit} onChange={(e) => handleChange(index, e)} style={{ width: '100%' }} /></td>
                                            <td><input type="text" name="UnitPrice" value={row.UnitPrice} onChange={(e) => handleQuantityOrPriceChange(index, e)} required style={{ width: '100%' }} /></td>
                                            <td><input type="text" name="TotalCost" value={row.TotalCost} readOnly style={{ width: '100%' }} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ flex: '1', maxHeight: '600px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}>
                            <h3>재료 목록 (공장 재고)</h3>
                            <ul>
                                {materialList.map((material) => (
                                    <li key={material.materialId}>
                                        {material.materialId} - {material.materialName} 
                                    </li>
                                ))}
                            </ul>
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MBOMForm;
