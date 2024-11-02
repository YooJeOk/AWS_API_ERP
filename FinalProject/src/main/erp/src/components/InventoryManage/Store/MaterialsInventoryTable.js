import React from 'react';
import './InventoryTables.css'; 

const MaterialsInventoryTable = ({ materials }) => {
    return (
        <div className='materials-inner-table'>
            <h4>자재</h4>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>자재 ID</th>
                        <th>자재명</th>
                        <th>카테고리</th>
                        <th>단가</th>
                        <th>매장 수량 / 단위</th>
                        {/* <th>최소 수량</th> */}
                    </tr>
                </thead>
                <tbody>
                    {materials.map(material => (
                        <tr 
                            key={material.materialId}
                            className={material.quantityInStore < material.minimumStock ? 'table-danger text-bold' : ''}
                        >
                            <td className={material.quantityInStore < material.minimumStock ? 'text-red' : ''}>{material.materialId}</td>
                            <td className={material.quantityInStore < material.minimumStock ? 'text-red' : ''}>{material.materialName}</td>
                            <td className={material.quantityInStore < material.minimumStock ? 'text-red' : ''}>{material.category}</td>
                            <td className={material.quantityInStore < material.minimumStock ? 'text-red' : ''}>{material.unitPrice}</td>
                            <td className={material.quantityInStore < material.minimumStock ? 'text-red' : ''}>{material.quantityInStore || 'N/A'} / {material.unit}</td>
                            {/* <td>{material.minimumStock}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialsInventoryTable;