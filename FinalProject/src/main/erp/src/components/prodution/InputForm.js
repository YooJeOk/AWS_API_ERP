import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './production.css';

function InputForm() {
    const [formData, setFormData] = useState({
        productionPeriodStart: null,
        productionPeriodEnd: null,
        baseItem: '',
        productionCalculation: '',
        mrpCalculation: '',
        status: '',
        others: ''
    });

    const handlePeriodStartChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            productionPeriodStart: date,
        }));
    };

    const handlePeriodEndChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            productionPeriodEnd: date,
        }));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('폼 제출됨:', formData);
    };

    return (
        <div className="custom-container">
            <div className="form-container">
                <h1>생산계획 등록</h1>
                <form id="input-form" onSubmit={handleSubmit}>

                    {/* 생산계획 레이블 및 기간 선택 */}
                    <div className="form-group">
                        <label>생산계획:</label>
                        <div className="date-picker-wrapper">
                            <DatePicker
                                selected={formData.productionPeriodStart}
                                onChange={handlePeriodStartChange}
                                selectsStart
                                startDate={formData.productionPeriodStart}
                                endDate={formData.productionPeriodEnd}
                                dateFormat="yyyy/MM/dd"
                                placeholderText="시작 시간 선택"
                                className="date-picker"
                            />
                        </div>
                        <div className="date-picker-wrapper">
                            <DatePicker
                                selected={formData.productionPeriodEnd}
                                onChange={handlePeriodEndChange}
                                selectsEnd
                                startDate={formData.productionPeriodStart}
                                endDate={formData.productionPeriodEnd}
                                minDate={formData.productionPeriodStart}
                                dateFormat="yyyy/MM/dd"
                                placeholderText="종료 시간 선택"
                                className="date-picker"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="base-item">기준품목:</label>
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
                        <label htmlFor="production-calculation">생산계획계산:</label>
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
                        <label htmlFor="mrp-calculation">MRP계산:</label>
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
                        <label htmlFor="status">생산계획/MRP현황:</label>
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
                        <label htmlFor="others">기타:</label>
                        <input
                            type="text"
                            id="others"
                            name="others"
                            value={formData.others}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-button">저장</button>
                </form>
            </div>
        </div>
    );
}

export default InputForm;
