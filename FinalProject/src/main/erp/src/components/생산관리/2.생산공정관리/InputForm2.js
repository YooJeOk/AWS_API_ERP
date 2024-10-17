import React, { useState } from 'react';
import './production.css';  // CSS 파일을 적용할 경우 사용

function InputArrivalForm() {
    // 폼 데이터를 관리할 상태를 생성
    const [formData, setFormData] = useState({
        arrivalDate: '',
        productCode: '',
        productName: '',
        specification: '',
        quantity: '',
        others: '',
        workOrder: ''
    });

    // 폼 데이터가 변경될 때 상태를 업데이트
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 폼 제출 처리
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('입고 등록 데이터:', formData);
        // 여기서 formData를 서버로 전송하는 비동기 처리 등을 추가 가능
    };

    return (
        <div className="custom-container">
            <div className="form-container">
                <h1>입고 등록</h1>
                <form id="input-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="arrival-date">입고 일자:</label>
                        <input
                            type="date"
                            id="arrival-date"
                            name="arrivalDate"
                            value={formData.arrivalDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-code">생산품목 코드:</label>
                        <input
                            type="text"
                            id="product-code"
                            name="productCode"
                            value={formData.productCode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-name">생산품목명:</label>
                        <input
                            type="text"
                            id="product-name"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="specification">규격:</label>
                        <input
                            type="text"
                            id="specification"
                            name="specification"
                            value={formData.specification}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">수량:</label>
                        <input
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="others">기타:</label>
                        <input
                            type="text"
                            id="others"
                            name="others"
                            value={formData.others}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="work-order">작업지시서:</label>
                        <input
                            type="text"
                            id="work-order"
                            name="workOrder"
                            value={formData.workOrder}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-button">등록</button>
                </form>
            </div>
        </div>
    );
}

export default InputArrivalForm;
