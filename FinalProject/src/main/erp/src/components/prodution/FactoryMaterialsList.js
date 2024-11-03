import React from 'react';

const FactoryMaterialsList = ({ materials }) => {
    return (
        <div className='factory-materials-list'>
            <h4>재료 목록 (공장 재고)</h4>
            <ul>
                {materials.map(material => (
                    <li key={material.materialId}>
                        {material.materialId}: {material.materialName} - {material.quantityInFactory} {material.unit}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FactoryMaterialsList;