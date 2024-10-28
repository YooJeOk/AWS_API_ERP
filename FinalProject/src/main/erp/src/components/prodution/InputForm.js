import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './production.css';
import axios from 'axios';

function InputForm() {
    const [formData, setFormData] = useState({
        productionPeriodStart: null,
        productionPeriodEnd: null,
        productId: '',  // 제품 ID 입력 필드
        others: ''      // 기타 입력 필드 추가
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/production-planning/create', formData);
            alert(response.data);
        } catch (error) {
            console.error('데이터 저장 실패:', error);
            alert('데이터 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="custom-container">
            <div className="form-container">
                <h1>생산 계획 등록</h1>
                <form id="input-form" onSubmit={handleSubmit}>
                    {/* 제품 ID 입력 필드 */}
                    <div className="form-group">
                        <label htmlFor="productId">제품 ID:</label>
                        <input
                            type="text"
                            id="productId"
                            name="productId"
                            value={formData.productId}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* 생산계획 기간 선택 (날짜 및 시간 포함) */}
                    <div className="form-group">
                        <label>생산계획기간:</label>
                        <div className="date-picker-wrapper">
                            <DatePicker
                                selected={formData.productionPeriodStart}
                                onChange={handlePeriodStartChange}
                                selectsStart
                                startDate={formData.productionPeriodStart}
                                endDate={formData.productionPeriodEnd}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}  // 15분 간격으로 시간 선택
                                dateFormat="yyyy/MM/dd HH:mm"
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
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}  // 15분 간격으로 시간 선택
                                dateFormat="yyyy/MM/dd HH:mm"
                                placeholderText="종료 시간 선택"
                                className="date-picker"
                            />
                        </div>
                    </div>

                    {/* 기타 입력 필드 */}
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
