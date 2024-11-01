import React, { useState } from 'react';
import './production.css';

function InputForm5() {
    
    const [formData, setFormData] = useState({
        productionPeriod: '',
        baseItem: '',
        productionCalculation: '',
        mrpCalculation: '',
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
        
    };

    return (
        <div className="custom-container">
            <div className="form-container">
                <h1>소요량 조회</h1>
                <form id="input-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="production-period">생산품목:</label>
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
                        <label htmlFor="base-item">소모품목:</label>
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
                        <label htmlFor="production-calculation">생산공정:</label>
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
                        <label htmlFor="mrp-calculation">품목코드:</label>
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
                        <label htmlFor="mrp-calculation">품목명(규격):</label>
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

export default InputForm5;
