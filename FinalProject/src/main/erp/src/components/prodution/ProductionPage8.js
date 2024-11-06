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

    useEffect(() => {
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

                // 온도가 38도 이상일 경우 서버에 알림 요청 보내기
                if (sanitizedData.temperature >= 38) {
                    setIsEmergencyActive(true);
                    await axios.post('http://localhost:8080/api/alert', {
                        orderId: sanitizedData.orderId,
                        temperature: sanitizedData.temperature,
                        productName: sanitizedData.productName
                    });
                }
            } catch (error) {
                console.error(`OrderID ${orderId} 데이터 로드 오류:`, error);
            }
        };

        const intervals = [1, 2, 3, 4].map((orderId, index) =>
            setInterval(() => fetchData(orderId, index), 5000)
        );

        return () => intervals.forEach(clearInterval);
    }, []);

    const COLORS = ['#FF0000', '#00FF00'];
    const lineNames = ['1라인', '2라인', '3라인', '4라인'];

    const getNeedleRotation = (temp) => {
        if (temp < 20) return 180;
        if (temp > 30) return 0;
        return 180 - ((temp - 20) * 9);
    };

    const getTemperatureColor = (temp) => {
        if (temp < 20 || temp > 30) return "#FF8042";
        if (temp < 23 || temp > 27) return "#FFBB28";
        return "#00C49F";
    };

    const handleEmergencyClick = () => {
        setShowEmergencyModal(true);
    };

    const confirmEmergencyStop = () => {
        setShowEmergencyModal(false);
        alert("모든 생산이 중지되었습니다.");
        setIsEmergencyActive(false);
    };

    const cancelEmergencyStop = () => {
        setShowEmergencyModal(false);
    };

    return (
        <div className="custom-container">
            <main className="production-content">
                <button
                    className={`emergency-button ${isEmergencyActive ? 'active' : ''}`}
                    onClick={handleEmergencyClick}
                    disabled={!isEmergencyActive}
                >
                    긴급 정지
                </button>
                {showEmergencyModal && (
                    <div className="emergency-modal">
                        <div className="emergency-modal-content">
                            <h2>정말로 위험과 손해를 감수하시고 책임을 지시겠습니까?</h2>
                            <button onClick={confirmEmergencyStop}>예</button>
                            <button onClick={cancelEmergencyStop}>아니오</button>
                        </div>
                    </div>
                )}
                <div className="chart-container">
                    {data.map((item, index) => (
                        <div key={index} className="chart-box">
                            <div className="pie-chart-container">
                                <h3 className="line-name" style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                                    {lineNames[index]}
                                </h3>
                                <PieChart width={350} height={300}>
                                    <Pie
                                        data={[
                                            { name: '생산률', value: item.productionRate },
                                            { name: '남은 비율', value: 100 - item.productionRate }
                                        ]}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={140}
                                        startAngle={90}
                                        endAngle={-270}
                                        paddingAngle={0}
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
                                <div className="temperature" style={{ marginTop: '10px', transform: 'scale(1)', transformOrigin: 'top' }}>
                                    <h4 style={{ textAlign: 'center', fontSize: '20px' }}>온도 상태</h4>
                                    <PieChart width={100} height={60}>
                                        <Pie
                                            data={[
                                                { name: '왼쪽 파란색', value: 33.33 },
                                                { name: '중앙 초록색', value: 33.33 },
                                                { name: '오른쪽 빨간색', value: 33.34 }
                                            ]}
                                            dataKey="value"
                                            cx="50%"
                                            cy="100%"
                                            innerRadius={20}
                                            outerRadius={40}
                                            startAngle={180}
                                            endAngle={0}
                                        >
                                            <Cell fill="#0000FF" />
                                            <Cell fill="#00FF00" />
                                            <Cell fill="#FF0000" />
                                        </Pie>
                                        <path
                                            d={`M50,60 L${50 + 30 * Math.cos((getNeedleRotation(item.temperature) * Math.PI) / 180)},${60 - 30 * Math.sin((getNeedleRotation(item.temperature) * Math.PI) / 180)}`}
                                            stroke={getTemperatureColor(item.temperature)}
                                            strokeWidth="2"
                                        />
                                    </PieChart>
                                    <div style={{ textAlign: 'center', marginTop: '5px', color: getTemperatureColor(item.temperature), fontSize: '20px' }}>
                                        {item.temperature}°C
                                    </div>
                                </div>
                            </div>
                            <div className="humidity" style={{ fontSize: '20px', color: 'black', textAlign: 'center', marginTop: '10px' }}>
                                <span>습도: {item.humidity}%</span>
                            </div>
                            <div className="product-name" style={{ fontSize: '24px', color: 'black', textAlign: 'center', marginTop: '10px' }}>
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
