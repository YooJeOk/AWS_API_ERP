import React from 'react';

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
                        {/* <th>생산 날짜</th> */}
                        {/* <th>추천 여부</th> */}
                        {/* <th>제품 설명</th> */}
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.productCategory}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.salePrice}</td>
                            <td>{product.quantityInStore}</td>
                            {/* <td>{new Date(product.productionDate).toLocaleDateString()}</td> */}
                            {/* <td>{product.recommend}</td> */}
                            {/* <td>{product.detailDescription}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductInventoryTable;