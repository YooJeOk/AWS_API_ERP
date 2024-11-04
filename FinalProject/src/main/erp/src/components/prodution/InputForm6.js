import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './production.css';

function MBOMForm() {
    const [unprocessedDefects, setUnprocessedDefects] = useState([]); // 미처리된 불량 항목 저장 상태
    const [error, setError] = useState(null); // 에러 상태

    // 데이터 불러오는 함수
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/defects/status?status=미처리'); // 실제 API 주소 사용
            if (response.status === 200) {
                setUnprocessedDefects(response.data);
            } else {
                setError("데이터를 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("데이터 불러오기 오류:", error);
            setError("데이터를 불러오는 중 오류가 발생했습니다.");
        }
    };

    // 컴포넌트 로드시 데이터 불러오기
    useEffect(() => {
        fetchData();
    }, []);

    // 불량 항목 상태 변경 핸들러
    const handleStatusChange = async (index, defectId) => {
        try {
            // API로 상태 업데이트 요청
            const response = await axios.put(`http://localhost:8080/api/defects/${defectId}`, {
                status: '완료'
            });

            if (response.status === 200) {
                // 상태 업데이트가 성공하면 데이터 목록 다시 불러오기
                fetchData();
            } else {
                setError("상태 업데이트에 실패했습니다.");
            }
        } catch (error) {
            console.error("상태 업데이트 오류:", error);
            setError("상태 업데이트 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <h2>미처리된 불량 조회 리스트</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {unprocessedDefects.length > 0 ? (
                        <table className="table production-table">
                            <thead>
                                <tr>
                                    <th>품질 관리ID</th>
                                    <th>상품명</th>
                                    <th>상품 수량</th>
                                    <th>불량 수량</th>
                                    <th>불량 유형</th>
                                    <th>불량 원인</th>
                                    <th>불량 처리 상태</th>
                                    <th>불량률</th>
                                    <th>기타</th>
                                    <th>처리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {unprocessedDefects.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.qcid}</td>
                                        <td>{row.productName}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.defectQuantity}</td>
                                        <td>{row.defectType}</td>
                                        <td>{row.causeDescription}</td>
                                        <td>{row.status}</td>
                                        <td>{row.defectRate}</td>
                                        <td>{row.etc}</td>
                                        <td>
                                            <button onClick={() => handleStatusChange(index, row.qcid)} className="process-button">
                                                처리 완료
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>미처리된 불량 항목이 없습니다.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default MBOMForm;
