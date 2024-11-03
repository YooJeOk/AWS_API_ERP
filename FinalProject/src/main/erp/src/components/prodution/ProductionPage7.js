import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './ProductionPage.css';
import InputForm7 from './InputForm7';

function Production7() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/quality-control');
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                console.error("데이터를 불러오는 중 에러 발생:", error);
                alert("데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        };
        fetchData();
    }, []);

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    return (
        <div className="custom-container">
            <aside id="sidebar"></aside>
            <main className="production-content">
                <div className="production-mainbar">
                    <div className="productionbar">
                        <h1>품질검사 조회</h1>
                        <button className="create-button" onClick={() => navigate('/input7')}>
                            생성
                        </button>
                    </div>
                    <table className="table production-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '10%', padding: '10px', border: '1px solid #ddd',  }}>주문ID</th>
                                <th style={{ width: '15%', padding: '10px', border: '1px solid #ddd',  }}>상품명</th>
                                <th style={{ width: '10%', padding: '10px', border: '1px solid #ddd',  }}>검사 수량</th>
                                <th style={{ width: '20%', padding: '10px', border: '1px solid #ddd',  }}>검사 날짜</th>
                                <th style={{ width: '15%', padding: '10px', border: '1px solid #ddd',  }}>검사 결과</th>
                                <th style={{ width: '20%', padding: '10px', border: '1px solid #ddd',  }}>기타 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((row, index) => (
                                    <tr key={row.qcid || index}>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.orderID}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.productName}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.quantity}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{formatDate(row.testDate)}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.testResult}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.etc || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>등록된 데이터가 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Routes>
                    <Route path="/input7" element={<InputForm7 />} />
                </Routes>
            </main>
        </div>
    );
}

export default Production7;
