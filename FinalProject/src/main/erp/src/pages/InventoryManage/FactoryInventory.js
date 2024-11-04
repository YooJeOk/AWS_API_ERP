import React, { useState, useEffect, useCallback } from 'react';
import ProductInventoryTable from '../../components/InventoryManage/Factory/ProductInventoryTable';
import MaterialsInventoryTable from '../../components/InventoryManage/Factory/MaterialsInventoryTable';
import Pagination from '../../components/InventoryManage/Pagination';
import './StoreInventory.css';  

const FactoryInventory = () => {
    const [productInventory, setProductInventory] = useState({ content: [], totalPages: 0 });
    const [materialInventory, setMaterialInventory] = useState({ content: [], totalPages: 0 });
    const [productPage, setProductPage] = useState(0);
    const [materialPage, setMaterialPage] = useState(0);
    const [productSearch, setProductSearch] = useState('');
    const [materialSearch, setMaterialSearch] = useState('');
    const [productSize, setProductSize] = useState(5);
    const [materialSize, setMaterialSize] = useState(5);
    const [expandedProduct, setExpandedProduct] = useState(false);
    const [expandedMaterial, setExpandedMaterial] = useState(false);

    const fetchProductInventory = useCallback(async () => {
        const response = await fetch(`http://localhost:8080/api/factory/inventory/products?page=${productPage}&size=${productSize}&search=${productSearch}`);
        const data = await response.json();
        setProductInventory(data);
    }, [productPage, productSize, productSearch]);

    const fetchMaterialInventory = useCallback(async () => {
        const response = await fetch(`http://localhost:8080/api/factory/inventory/materials?page=${materialPage}&size=${materialSize}&search=${materialSearch}`);
        const data = await response.json();
        setMaterialInventory(data);
    }, [materialPage, materialSize, materialSearch]);

    useEffect(() => {
        fetchProductInventory();
        fetchMaterialInventory();
    }, [fetchProductInventory, fetchMaterialInventory]);

    const handleProductSearch = (e) => {
        setProductSearch(e.target.value);
        setProductPage(0);
    };

    const handleMaterialSearch = (e) => {
        setMaterialSearch(e.target.value);
        setMaterialPage(0);
    };

    const toggleProductExpand = () => {
        setExpandedProduct(!expandedProduct);
        setProductSize(expandedProduct ? 5 : 10);
        setProductPage(0);
    };

    const toggleMaterialExpand = () => {
        setExpandedMaterial(!expandedMaterial);
        setMaterialSize(expandedMaterial ? 5 : 10);
        setMaterialPage(0);
    };

    return (
        <div className='store-inven-container container-md mt-4'>
            <h3 className='text-center'>공장 재고</h3>
            {(!expandedMaterial || expandedProduct) && (
                <div className='product-container'>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <div className='d-flex align-items-center'>
                            <h4 className='mb-0'>제품</h4>
                            <button 
                                onClick={toggleProductExpand}
                                className="toggle-expand-btn"
                            >
                                {expandedProduct ? '-' : '+'}
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="제품 검색"
                            value={productSearch}
                            onChange={handleProductSearch}
                            className="form-control w-auto inven-search"
                            style={{maxWidth: '200px'}}
                        />
                    </div>
                    <div className='product-table' style={{ minHeight: '300px' }}>
                        {productInventory.content.length > 0 ? (
                            <ProductInventoryTable products={productInventory.content} />
                        ) : (
                            <p className="text-center">조회 결과가 없습니다.</p>
                        )}
                    </div>
                    <div className='product-page'>
                        <Pagination
                            currentPage={productPage}
                            totalPages={productInventory.totalPages}
                            onPageChange={setProductPage}
                        />
                    </div>
                </div>
            )}
            {(!expandedProduct || expandedMaterial) && (
                <div className='material-container mt-4'>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <div className='d-flex align-items-center'>
                            <h4 className='mb-0'>자재</h4>
                            <button 
                                onClick={toggleMaterialExpand}
                                className="toggle-expand-btn"
                            >
                                {expandedMaterial ? '-' : '+'}
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="자재 검색"
                            value={materialSearch}
                            onChange={handleMaterialSearch}
                            className="form-control w-auto inven-search" 
                            style={{maxWidth: '200px'}}
                        />
                    </div>
                    <div className='materials-table' style={{ minHeight: '300px' }}>
                        {materialInventory.content.length > 0 ? (
                            <MaterialsInventoryTable materials={materialInventory.content} />
                        ) : (
                            <p className="text-center">조회 결과가 없습니다.</p>
                        )}
                    </div>
                    <div className='materials-page'>
                        <Pagination
                            currentPage={materialPage}
                            totalPages={materialInventory.totalPages}
                            onPageChange={setMaterialPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FactoryInventory;