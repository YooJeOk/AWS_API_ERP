import React, { useState } from 'react';
import './0/ProductionPage.css';

function InputArrivalForm() {
    // 폼 데이터를 관리할 상태
    const [formData, setFormData] = useState({
        arrivalDate: '',
        productCode: '',
        productName: '',
        specification: '',
        quantity: '',
        others: '',
        workOrder: ''
    });

    // 테이블에 보여줄 데이터를 관리할 상태
    const [tableData, setTableData] = useState([]);

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
        setTableData([...tableData, formData]);  // 테이블에 데이터 추가
        setFormData({  // 폼 초기화
            arrivalDate: '',
            productCode: '',
            productName: '',
            specification: '',
            quantity: '',
            others: '',
            workOrder: ''
        });
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>입고 등록</h1>
                        <button className="create-button">생성</button>
                    </div>
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>입고 일자</th>
                                <th>생산품목 코드</th>
                                <th>생산품목명</th>
                                <th>규격</th>
                                <th>수량</th>
                                <th>기타</th>
                                <th>작업지시서</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.arrivalDate}</td>
                                        <td>{row.productCode}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.specification}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.others}</td>
                                        <td>{row.workOrder}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">등록된 데이터가 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default InputArrivalForm;
