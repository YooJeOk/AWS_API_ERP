import React from 'react';
import './InventoryTables.css'; 

const ProductInventoryTable = ({ products }) => {
    return (
        <div className='product-inner-table'>
            <h4>제품</h4>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>제품 ID</th>
                        <th>제품명</th>
                        <th>카테고리</th>
                        <th>원가</th>
                        <th>판매가</th>
                        <th>매장 수량</th>
                        {/* <th>최소 수량</th> */}
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr 
                            key={product.productId}
                            className={product.quantityInStore < product.minimumStock ? 'table-danger text-bold' : ''}
                        >
                            <td className={product.quantityInStore < product.minimumStock ? 'text-red' : ''}>{product.productId}</td>
                            <td className={product.quantityInStore < product.minimumStock ? 'text-red' : ''}>{product.productName}</td>
                            <td className={product.quantityInStore < product.minimumStock ? 'text-red' : ''}>{product.productCategory}</td>
                            <td className={product.quantityInStore < product.minimumStock ? 'text-red' : ''}>{product.unitPrice}</td>
                            <td className={product.quantityInStore < product.minimumStock ? 'text-red' : ''}>{product.salePrice}</td>
                            <td className={product.quantityInStore < product.minimumStock ? 'text-red' : ''}>{product.quantityInStore}개</td>
                            {/* <td>{product.minimumStock}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductInventoryTable;