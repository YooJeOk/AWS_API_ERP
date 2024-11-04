import React, { useState } from 'react';
import './production.css';

function InputFormBMOM2() {
    
    const [formData, setFormData] = useState({
        itemId: '',
        itemType: 'Product',
        size: '',
        materialId: '',
        productName: '',
        quantity: '',
        unit: '',
        unitPrice: '',
        totalCost: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('폼 제출됨:', formData);
        
        try {
            const response = await fetch('http://localhost:8080/api/bmom2/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('데이터가 성공적으로 저장되었습니다.');
            } else {
                alert('데이터 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('에러 발생:', error);
            alert('서버 오류로 데이터 저장에 실패했습니다.');
        }
    };

    return (
        <div className="custom-container">
            <div className="form-container">
                <h1>BMOM2 등록</h1>
                <form id="input-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="itemId">제품ID:</label>
                        <input
                            type="text"
                            id="itemId"
                            name="itemId"
                            value={formData.itemId}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemType">제품 유형:</label>
                        <select
                            id="itemType"
                            name="itemType"
                            value={formData.itemType}
                            onChange={handleChange}
                            required
                        >
                            <option value="Product">Product</option>
                            <option value="Coffee">Coffee</option>
                        </select>
                    </div>

                    {formData.itemType === 'Coffee' && (
                        <div className="form-group">
                            <label htmlFor="size">사이즈:</label>
                            <select
                                id="size"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                            >
                                <option value="">선택</option>
                                <option value="Regular">Regular</option>
                                <option value="Extra">Extra</option>
                            </select>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="materialId">자재ID:</label>
                        <input
                            type="text"
                            id="materialId"
                            name="materialId"
                            value={formData.materialId}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="productName">제품명:</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">수량:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="unit">단위:</label>
                        <input
                            type="text"
                            id="unit"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="unitPrice">단가:</label>
                        <input
                            type="number"
                            id="unitPrice"
                            name="unitPrice"
                            value={formData.unitPrice}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="totalCost">제품 원가:</label>
                        <input
                            type="number"
                            id="totalCost"
                            name="totalCost"
                            value={formData.totalCost}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-button">등록</button>
                </form>
            </div>
        </div>
    );
}

export default InputFormBMOM2;
