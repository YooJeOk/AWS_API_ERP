import React, { useState } from 'react';
import 'chart.js'

function InputForm3() {
    // 폼 데이터를 관리할 상태를 생성
    const [formData, setFormData] = useState({
        productionDate: '',
        productionPeriod: '',
        baseItem: '',
        productionCalculation: '',
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
                <h1>작업 내역 입력</h1>
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
                        <label htmlFor="production-period">생산품목 코드:</label>
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
                        <label htmlFor="base-item">생산품목명:</label>
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
                        <label htmlFor="production-calculation">규격:</label>
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
                        <label htmlFor="status">작업 품목명:</label>
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
                        <label htmlFor="others">투입자원&작업시간:</label>
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

export default InputForm3;
