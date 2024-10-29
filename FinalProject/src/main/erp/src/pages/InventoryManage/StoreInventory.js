import React, { useState, useEffect, useCallback } from 'react';
import ProductInventoryTable from '../../components/InventoryManage/ProductInventoryTable';
import MaterialsInventoryTable from '../../components/InventoryManage/MaterialsInventoryTable';
import Pagination from '../../components/InventoryManage/Pagination';
import './StoreInventory.css';  

const StoreInventory = () => {
    const [productInventory, setProductInventory] = useState({ content: [], totalPages: 0 });
    const [materialInventory, setMaterialInventory] = useState({ content: [], totalPages: 0 });
    const [productPage, setProductPage] = useState(0);
    const [materialPage, setMaterialPage] = useState(0);

    const fetchProductInventory = useCallback(async () => {
        const response = await fetch(`http://localhost:8080/api/store/inventory/products?page=${productPage}&size=5`);
        const data = await response.json();
        setProductInventory(data);
    }, [productPage]);

    const fetchMaterialInventory = useCallback(async () => {
        const response = await fetch(`http://localhost:8080/api/store/inventory/materials?page=${materialPage}&size=5`);
        const data = await response.json();
        setMaterialInventory(data);
    }, [materialPage]);

    useEffect(() => {
        fetchProductInventory();
        fetchMaterialInventory();
    }, [fetchProductInventory, fetchMaterialInventory]);


    return (
        <div className='store-inven-container container-md mt-4'>
            <div className='product-container'>
                <div className='product-table'>
                    <ProductInventoryTable products={productInventory.content} />
                </div>
                <div className='product-page'>
                    <Pagination
                        currentPage={productPage}
                        totalPages={productInventory.totalPages}
                        onPageChange={setProductPage}
                    />
                </div>
            </div>
            <div className='material-container'>
                <div className='materials-table'>
                    <MaterialsInventoryTable materials={materialInventory.content} />
                </div>
                <div className='materials-page'>
                    <Pagination
                        currentPage={materialPage}
                        totalPages={materialInventory.totalPages}
                        onPageChange={setMaterialPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default StoreInventory;