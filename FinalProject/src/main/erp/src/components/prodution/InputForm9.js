import React, { useState } from 'react';
import './production.css';

function InputForm9() {
    const [formData, setFormData] = useState({
        productionDate: '',
        productionCalculation: '',
        productionPeriod: '',
        baseItem: '',
        status: '',
        mrpCalculation: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('폼 제출됨:', formData);
        // 여기서 formData를 서버로 전송하는 비동기 처리 등을 추가할 수 있습니다.
    };

    return (
        <div className="custom-container">
            <div className="form-container">
                <h1>생산 실적 등록</h1>
                <form id="input-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="production-date">작업 일자:</label>
                        <input
                            type="date"
                            id="production-date"
                            name="productionDate"
                            value={formData.productionDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="production-calculation">작업지시번호:</label>
                        <input
                            type="text"
                            id="production-calculation"
                            name="productionCalculation"
                            value={formData.productionCalculation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="production-period">품목 코드:</label>
                        <input
                            type="text"
                            id="production-period"
                            name="productionPeriod"
                            value={formData.productionPeriod}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="base-item">품목명:</label>
                        <input
                            type="text"
                            id="base-item"
                            name="baseItem"
                            value={formData.baseItem}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">수량:</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mrp-calculation">불량률:</label>
                        <input
                            type="text"
                            id="mrp-calculation"
                            name="mrpCalculation"
                            value={formData.mrpCalculation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">등록</button>
                </form>
            </div>
        </div>
    );
}

export default InputForm9;
