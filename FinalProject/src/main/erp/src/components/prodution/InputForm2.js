import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './production.css';

function MBOMForm() {
    const [formData, setFormData] = useState({
        qcid: '',                // 품질 검사 ID (선택형)
        orderId: '',             // 주문 ID
        productId: '',           // 상품 ID
        productName: '',         // 상품명
        quantity: '',            // 수량 (int형)
        entryDate: '',           // 입고 날짜 및 시간 (datetime-local)
        etc: ''                  // 기타 사항
    });
    const [availableQCIDs, setAvailableQCIDs] = useState([]); // 완료된 불량 처리 품질 검사 ID 리스트

    useEffect(() => {
        const fetchAvailableQCIDs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/defects/completed');
                if (response.status === 200) {
                    setAvailableQCIDs(response.data);
                }
            } catch (error) {
                console.error("사용 가능한 품질 검사 ID를 가져오는 중 오류 발생:", error);
            }
        };
        fetchAvailableQCIDs();
    }, []);

    // QCID 변경 시 불량 데이터 불러오기
    const handleQCIDChange = async (e) => {
        const qcid = e.target.value;
        setFormData((prevData) => ({ ...prevData, qcid }));

        if (qcid) {
            try {
                const response = await axios.get(`http://localhost:8080/api/defects/${qcid}`);
                if (response.status === 200) {
                    const { orderId, productId, productName, quantity } = response.data;
                    setFormData((prevData) => ({
                        ...prevData,
                        orderId,
                        productId,
                        productName,
                        quantity
                    }));
                }
            } catch (error) {
                console.error("불량 데이터 불러오기 오류:", error);
                alert("해당 품질 검사 ID로 데이터를 불러올 수 없습니다.");
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                orderId: '',
                productId: '',
                productName: '',
                quantity: ''
            }));
        }
    };

    // 기타 필드 상태 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // 폼 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            ...formData,
            orderId: parseInt(formData.orderId, 10),
            quantity: parseInt(formData.quantity, 10),
            entryDate: formData.entryDate ? new Date(formData.entryDate).toISOString() : ''
        };

        try {
            const response = await axios.post('http://localhost:8080/api/production-entry', postData);
            if (response.status === 200) {
                alert('생산 입고가 성공적으로 등록되었습니다.');
                setFormData({
                    qcid: '',
                    orderId: '',
                    productId: '',
                    productName: '',
                    quantity: '',
                    entryDate: '',
                    etc: ''
                });
            }
        } catch (error) {
            console.error('등록 중 에러 발생:', error);
            alert('등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar" style={{ marginBottom: '20px' }}>
                        <h1>생산 입고 등록</h1>
                    </div>
                    <form id="mbom-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <table className="table production-table" style={{ marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>품질 검사 ID</th>
                                    <th>주문ID</th>
                                    <th>상품ID</th>
                                    <th>상품명</th>
                                    <th>수량</th>
                                    <th>입고 날짜 및 시간</th>
                                    <th>기타 사항</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select name="qcid" value={formData.qcid} onChange={handleQCIDChange} required>
                                            <option value="">품질 검사 ID 선택</option>
                                            {availableQCIDs.map((qc, index) => (
                                                <option key={qc.qcid || index} value={qc.qcid}>
                                                    {qc.qcid}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><input type="text" name="orderId" value={formData.orderId} readOnly required /></td>
                                    <td><input type="text" name="productId" value={formData.productId} readOnly required /></td>
                                    <td><input type="text" name="productName" value={formData.productName} readOnly required /></td>
                                    <td><input type="number" name="quantity" value={formData.quantity} readOnly required /></td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            name="entryDate"
                                            value={formData.entryDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                    <td><input type="text" name="etc" value={formData.etc} onChange={handleChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" className="submit-button">등록</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default MBOMForm;
