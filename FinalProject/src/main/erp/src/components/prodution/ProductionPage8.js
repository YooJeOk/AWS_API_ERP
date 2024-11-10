import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';
import './ChartStyles.css';

function ProductionMonitoringPage() {
    const [data, setData] = useState([
        { orderId: 1, productionRate: 0, temperature: 25, humidity: 50, productName: '갈릭꽈베기' },
        { orderId: 2, productionRate: 0, temperature: 25, humidity: 50, productName: '단팥도넛' },
        { orderId: 3, productionRate: 0, temperature: 25, humidity: 50, productName: '고구마케이크빵' },
        { orderId: 4, productionRate: 0, temperature: 25, humidity: 50, productName: '꽈베기' }
    ]);
    const [isEmergencyActive, setIsEmergencyActive] = useState(false);
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [isColorBlindMode, setIsColorBlindMode] = useState(false);
    const [dangerOverlayIndex, setDangerOverlayIndex] = useState(null);
    const [completedModal, setCompletedModal] = useState(null);
    const [alertSent80, setAlertSent80] = useState(false);
    const [language, setLanguage] = useState('ko');
    const intervals = React.useRef([]);

    const fetchData = async (orderId, index) => {
        try {
            const response = await axios.get(`http://localhost:8080/monitoring/data/${orderId}`);
            const newData = response.data;

            const sanitizedData = {
                orderId: orderId,
                productionRate: newData.productionRate || 0,
                temperature: newData.temperature || 0,
                humidity: newData.humidity || 0,
                productName: data[index].productName
            };

            setData((prevData) => {
                const updatedData = [...prevData];
                updatedData[index] = sanitizedData;
                return updatedData;
            });

            if (sanitizedData.temperature >= 50 && index === 2) {
                setDangerOverlayIndex(2);
            } else if (index === 2) {
                setDangerOverlayIndex(null);
            }

            if (sanitizedData.temperature >= 80 && !alertSent80) {
                setAlertSent80(true);
                intervals.current.forEach(clearInterval);
                await axios.post('http://localhost:8080/api/send-one', {
                    orderId: sanitizedData.orderId,
                    temperature: sanitizedData.temperature,
                    productName: sanitizedData.productName
                });
            }

            if (sanitizedData.productionRate === 100) {
                setCompletedModal(sanitizedData.productName);
                setTimeout(() => setCompletedModal(null), 3000);
            }
        } catch (error) {
            console.error(`OrderID ${orderId} 데이터 로드 오류:`, error);
        }
    };

    useEffect(() => {
        if (!isEmergencyActive) {
            intervals.current = [1, 2, 3, 4].map((orderId, index) =>
                setInterval(() => fetchData(orderId, index), 5000)
            );
        } else {
            intervals.current.forEach(clearInterval);
            intervals.current = [];
        }

        return () => intervals.current.forEach(clearInterval);
    }, [isEmergencyActive]);

    const COLORS = isColorBlindMode ? ['#4FC3F7', '#FFF176'] : ['#FF9999', '#99FF99'];
    const lineNames = language === 'ko' ? ['1라인', '2라인', '3라인', '4라인'] : ['Line 1', 'Line 2', 'Line 3', 'Line 4'];

    const toggleColorBlindMode = () => {
        setIsColorBlindMode((prev) => !prev);
    };

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'ko' ? 'en' : 'ko'));
    };

    const handleEmergencyClick = () => {
        setShowEmergencyModal(true);
        setIsEmergencyActive(true);
        intervals.current.forEach(clearInterval);
    };

    const handleReactivationClick = () => {
        setIsEmergencyActive(false);
        setShowEmergencyModal(false);
        intervals.current = [1, 2, 3, 4].map((orderId, index) =>
            setInterval(() => fetchData(orderId, index), 5000)
        );
    };

    const handleClearAlert = () => {
        setDangerOverlayIndex(null);
        setAlertSent80(false);
    };

    return (
        <div className="custom-container">
            {completedModal && (
                <div className="completed-modal" style={{ zIndex: 10, width: '550px', height: '150px', backgroundColor: '#4CAF50', fontWeight: 'bold' }}>
                    <h2 style={{ fontSize: '21px', color: 'white', textAlign: 'center' }}>
                        {completedModal} {language === 'ko' ? '생산 완료! 다음 공정으로 이동합니다.' : 'Production Complete! Moving to the next process.'}
                    </h2>
                </div>
            )}
            {showEmergencyModal && (
                <div className="emergency-modal" style={{ zIndex: 20, border: '3px solid red', padding: '10px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>{language === 'ko' ? '비상 정지 중...' : 'Emergency Stop Active...'}</h2>
                </div>
            )}
            <main className="production-content">
                <div className="button-container">
                    <button className="color-blind-button" onClick={toggleColorBlindMode} style={{ marginRight: '50px', width: '150px', fontWeight: 'bold' }}>
                        {isColorBlindMode ? (language === 'ko' ? '일반 모드' : 'Normal Mode') : (language === 'ko' ? '적녹색약 모드' : 'Color Blind Mode')}
                    </button>
                    <button className="language-button" onClick={toggleLanguage} style={{ marginRight: '50px', width: '150px', fontWeight: 'bold' }}>
                        {language === 'ko' ? '영어' : 'Korean'}
                    </button>
                    <button className="clear-alert-button" onClick={handleClearAlert} style={{ marginRight: '50px', width: '150px', fontWeight: 'bold' }}>
                        {language === 'ko' ? '알림 끄기' : 'Clear Alert'}
                    </button>
                    <button
                        className="emergency-button"
                        onClick={isEmergencyActive ? handleReactivationClick : handleEmergencyClick}
                        style={{ width: '150px', fontWeight: 'bold' }}
                    >
                        {isEmergencyActive ? (language === 'ko' ? '재가동' : 'Restart') : (language === 'ko' ? '비상 정지' : 'Emergency Stop')}
                    </button>
                </div>
                <div className="chart-container1" style={{ position: 'relative' }}>
                    {data.map((item, index) => (
                        <div key={index} className="chart-box" style={{ position: 'relative' }}>
                            {dangerOverlayIndex === index && index === 2 && (
                                <div className="danger-overlay">
                                    <div className="blinking">
                                        {language === 'ko' ? '위험: 온도 초과' : 'Danger: Temperature Exceeded'}
                                    </div>
                                </div>
                            )}
                            <div className="pie-chart-container">
                                <h3 className="line-name" style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                                    {lineNames[index]}
                                </h3>
                                <PieChart width={350} height={300}>
                                    <Pie
                                        data={[
                                            { name: language === 'ko' ? '생산률' : 'Production Rate', value: item.productionRate },
                                            { name: language === 'ko' ? '남은 비율' : 'Remaining', value: 100 - item.productionRate }
                                        ]}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={140}
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {[COLORS[1], COLORS[0]].map((color, idx) => (
                                            <Cell key={`cell-${idx}`} fill={color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize={24}
                                        fontWeight="bold"
                                    >
                                        {item.productionRate}%
                                    </text>
                                </PieChart>
                            </div>
                            <div className="metrics-container">
                                <div className="temperature">
                                    <h4 style={{ textAlign: 'center', fontSize: '20px' }}>
                                        {language === 'ko' ? '온도 상태' : 'Temperature'}
                                    </h4>
                                    <div style={{ textAlign: 'center', color: item.temperature >= 50 ? '#FF0000' : '#00C49F', fontSize: '20px' }}>
                                        {item.temperature}°C
                                    </div>
                                </div>
                            </div>
                            <div className="humidity" style={{ fontSize: '20px', textAlign: 'center', marginTop: '10px' }}>
                                <span>{language === 'ko' ? '습도' : 'Humidity'}: {item.humidity}%</span>
                            </div>
                            <div className="product-name" style={{ fontSize: '24px', textAlign: 'center', marginTop: '10px' }}>
                                <span>{item.productName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductionMonitoringPage;
