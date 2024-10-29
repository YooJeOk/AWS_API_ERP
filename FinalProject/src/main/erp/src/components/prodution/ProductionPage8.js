import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';

import './ChartStyles.css';

function ProductionMonitoringPage() {
    const [data, setData] = useState([
        { orderId: 1, productionRate: 0, temperature: 25, humidity: 50, productName: '갈릭꽈베기'}, 
        { orderId: 2, productionRate: 0, temperature: 25, humidity: 50, productName: '단팥도넛' },
        { orderId: 3, productionRate: 0, temperature: 25, humidity: 50, productName: '고구마케이크빵' },
        { orderId: 4, productionRate: 0, temperature: 25, humidity: 50, productName: '꽈베기' }
    ]);

    useEffect(() => {
        const fetchData = async (orderId, index) => {
            try {
                const response = await axios.get(`http://localhost:8080/monitoring/data/${orderId}`);
                const newData = response.data;

                const sanitizedData = {
                    orderId: orderId,
                    productionRate: newData && newData.productionRate ? parseFloat(newData.productionRate) : 0,
                    temperature: newData && newData.temperature ? parseFloat(newData.temperature) : 0,
                    humidity: newData && newData.humidity ? parseFloat(newData.humidity) : 0,
                };

                setData((prevData) => {
                    const updatedData = [...prevData];
                    updatedData[index] = sanitizedData;
                    console.log("Updated data:", updatedData); // 데이터 갱신 로그 확인
                    return updatedData;
                });
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

    return (
        <div className="custom-container">
            <main className="production-content">
                <div className="chart-container">
                    {data.map((item, index) => (
                        <div key={index} className="chart-box">
                            <div className="pie-chart-container">
                                <h3 className="line-name" style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
                                    {lineNames[index]}
                                </h3>
                                {/* 생산률 원형 차트 */}
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
                                {/* 온도 상태 나침반 반원 차트 */}
                                <div className="temperature" style={{ marginTop: '20px', marginLeft: '15px' }}>
                                    <h4>온도 상태</h4>
                                    <PieChart width={120} height={80}>
                                        <Pie
                                            data={[
                                                { name: '정상', value: 33.33 },
                                                { name: '경고', value: 33.33 },
                                                { name: '위험', value: 33.34 }
                                            ]}
                                            dataKey="value"
                                            cx="50%"
                                            cy="100%"
                                            innerRadius={30}
                                            outerRadius={50}
                                            startAngle={180}
                                            endAngle={0}
                                        >
                                            <Cell fill="#00C49F" />
                                            <Cell fill="#FFBB28" />
                                            <Cell fill="#FF8042" />
                                        </Pie>
                                        <path
                                            d={`M75,80 L${75 + 40 * Math.cos((getNeedleRotation(item.temperature) * Math.PI) / 180)},${80 - 40 * Math.sin((getNeedleRotation(item.temperature) * Math.PI) / 180)}`}
                                            stroke={getTemperatureColor(item.temperature)}
                                            strokeWidth="2"
                                        />
                                    </PieChart>
                                    <div style={{ textAlign: 'center', marginTop: '5px', color: getTemperatureColor(item.temperature) }}>
                                        {item.temperature}°C
                                    </div>
                                </div>
                            </div>
                            <div className="humidity" style={{ fontSize: '0.9em', color: 'black', textAlign: 'center', marginTop: '10px' }}>
                                <span>습도: {item.humidity}%</span>
                                <br />
                                <span>제품명: {item.productName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductionMonitoringPage;
