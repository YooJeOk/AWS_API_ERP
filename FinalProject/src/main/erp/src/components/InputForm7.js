import React, { useState } from 'react';
import './production.css';

function QualityInspectionRegistration() {
    // 폼 데이터를 관리할 상태를 생성
    const [formData, setFormData] = useState({
        productionDate: '',
        productionCalculation: '',
        productionPeriod: '',
        baseItem: '',
        mrpCalculation: '',
        status: '',
        others: ''
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
        console.log('폼 제출됨:', formData);
        // 여기서 formData를 서버로 전송하는 비동기 처리 등을 추가 가능
    };

    return (
        <div className="custom-container">
            <div className="form-container">
                <h1>품질검사 등록</h1>
                <form id="input-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="production-date">검사 일자:</label>
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
                        <label htmlFor="production-calculation">검사 방법:</label>
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
                        <label htmlFor="mrp-calculation">수량:</label>
                        <input
                            type="text"
                            id="mrp-calculation"
                            name="mrpCalculation"
                            value={formData.mrpCalculation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">시료:</label>
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
                        <label htmlFor="others">합격 여부:</label>
                        <input
                            type="text"
                            id="others"
                            name="others"
                            value={formData.others}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-button">등록</button>
                </form>
            </div>
        </div>
    );
}

export default QualityInspectionRegistration;
