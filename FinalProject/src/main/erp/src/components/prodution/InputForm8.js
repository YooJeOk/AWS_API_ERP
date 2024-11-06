import React, { useState, useEffect } from 'react';
import './production.css';
import Pagination from '../InventoryManage/Pagination';

function MBOMForm() {
    const [formData, setFormData] = useState([
        {
            MaterialID: '',
            MaterialName: '',
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
    const [itemIdError, setItemIdError] = useState('');
    const size = 10;

    useEffect(() => {
        fetch(`/api/factory/inventory/materials?page=${page}&size=${size}`)
            .then(response => response.json())
            .then(data => setMaterialList(data.content))
            .catch(error => console.error('Error fetching material list:', error));
    }, [page]);

    const validateItemID = (value) => {
        if (isNaN(value) || value <= 0) {
            setItemIdError('0보다 큰 숫자만 입력 가능합니다.');
            return;
        }

        fetch(`/api/mbom/check-item-id/${value}`)
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    setItemIdError('이미 존재하는 ItemID입니다.');
                } else {
                    setItemIdError('');
                }
            })
            .catch(error => console.error('Error checking ItemID:', error));
    };

    const handleFixedChange = (e) => {
        const { name, value } = e.target;
        setFixedData({
            ...fixedData,
            [name]: value
        });

        if (name === 'ItemID') {
            validateItemID(value);
        }
    };

    const handleChange = (index, e) => {
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            [e.target.name]: e.target.value
        };
        calculateTotalCost(index, newFormData);
        setFormData(newFormData);
    };

    const calculateTotalCost = (index, newFormData) => {
        const quantity = parseFloat(newFormData[index].Quantity) || 0;
        const unitPrice = parseFloat(newFormData[index].UnitPrice) || 0;
        newFormData[index].TotalCost = (quantity * unitPrice).toFixed(2);
    };

    const handleQuantityOrPriceChange = (index, e) => {
        handleChange(index, e);
    };

    const handleMaterialIDChange = (index, e) => {
        const materialId = e.target.value;
        const selectedMaterial = materialList.find(material => material.materialId === parseInt(materialId));
        const newFormData = [...formData];
        newFormData[index].MaterialID = materialId;
        newFormData[index].MaterialName = selectedMaterial ? selectedMaterial.materialName : '';
        setFormData(newFormData);
    };

    const addRow = () => {
        if (formData.length < 15) {
            setFormData([
                ...formData,
                {
                    MaterialID: '',
                    MaterialName: '',
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

        if (itemIdError) {
            alert(itemIdError);
            return;
        }

        try {
            const formattedDataArray = formData.map((material) => ({
                ItemID: parseInt(fixedData.ItemID),
                itemType: fixedData.ItemType,
                ProductName: fixedData.ProductName,
                size: fixedData.Size || null,
                MaterialID: parseInt(material.MaterialID),
                Quantity: parseFloat(material.Quantity),
                Unit: material.Unit,
                UnitPrice: parseFloat(material.UnitPrice),
                TotalCost: parseFloat(material.TotalCost)
            }));

            for (const formattedData of formattedDataArray) {
                const response = await fetch('http://localhost:8080/api/mbom/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formattedData),
                });

                if (!response.ok) {
                    throw new Error("데이터 저장 중 오류가 발생했습니다.");
                }
            }

            alert("MBOM 데이터가 성공적으로 저장되었습니다.");
        } catch (error) {
            console.error("Error:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/api/factory/inventory/materials?page=${page}&size=19`)
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
                        <table className="table production-table" style={{ width: '60%' }}>
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
                                    <td>
                                        <input
                                            type="number"
                                            name="ItemID"
                                            value={fixedData.ItemID}
                                            onChange={handleFixedChange}
                                            style={{ width: '100%' }}
                                        />
                                        {itemIdError && (
                                            <div style={{ color: 'red', fontSize: '0.8em' }}>{itemIdError}</div>
                                        )}
                                    </td>
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
                            <table className="table production-table" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>재료ID</th>
                                        <th>재료이름</th>
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
                                                <select name="MaterialID" value={row.MaterialID} onChange={(e) => handleMaterialIDChange(index, e)} required style={{ width: '100%' }}>
                                                    <option value="">선택</option>
                                                    {materialList.map(material => (
                                                        <option key={material.materialId} value={material.materialId}>
                                                            {material.materialId}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td><input type="text" name="MaterialName" value={row.MaterialName} readOnly style={{ width: '100%' }} /></td>
                                            <td><input type="number" name="Quantity" min="1" step="1" value={row.Quantity} onChange={(e) => handleQuantityOrPriceChange(index, e)} required style={{ width: '100%' }} /></td>
                                            <td>
                                                <select name="Unit" value={row.Unit} onChange={(e) => handleChange(index, e)} style={{ width: '100%' }}>
                                                    <option value="ml">ml</option>
                                                    <option value="g">g</option>
                                                    <option value="개">개</option>
                                                </select>
                                            </td>
                                            <td style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="number" name="UnitPrice" min="1" step="1" value={row.UnitPrice} onChange={(e) => handleQuantityOrPriceChange(index, e)} required style={{ width: '80%' }} />
                                                <span style={{ marginLeft: '5px' }}>원</span>
                                            </td>
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
