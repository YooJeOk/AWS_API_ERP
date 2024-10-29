import React from 'react';

const MaterialsInventoryTable = ({ materials }) => {
    return (
        <div className='materials-inner-table'>
            <h2>자재 재고</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>자재 ID</th>
                        <th>자재명</th>
                        <th>카테고리</th>
                        {/* <th>단가</th> */}
                        <th>매장 수량</th>
                        <th>단위</th>
                        <th>최종 업데이트</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map(material => (
                        <tr key={material.materialId}>
                            <td>{material.materialId}</td>
                            <td>{material.materialName}</td>
                            <td>{material.category}</td>
                            <td>{material.quantityInStore || 'N/A'}</td>
                            {/* <td>{material.unitPrice}</td> */}
                            <td>{material.unit}</td>
                            <td>{new Date(material.lastUpdated).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialsInventoryTable;