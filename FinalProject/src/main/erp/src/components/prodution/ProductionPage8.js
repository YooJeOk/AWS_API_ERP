import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';

import './ChartStyles.css';

function ProductionMonitoringPage() {
    const [data, setData] = useState([
        { orderId: 1, productionRate: 0, temperature: 25, humidity: 50 }, 
        { orderId: 2, productionRate: 0, temperature: 25, humidity: 50 },
        { orderId: 3, productionRate: 0, temperature: 25, humidity: 50 },
        { orderId: 4, productionRate: 0, temperature: 25, humidity: 50 }
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

    const getTemperatureClass = (temp) => {
        if (temp < 20 || temp > 30) return 'danger';
        if (temp < 23 || temp > 27) return 'warning';
        return '';
    };

    const getHumidityClass = (hum) => {
        if (hum < 45 || hum > 75) return 'danger';
        if (hum < 50 || hum > 70) return 'warning';
        return '';
    };

    const getStatusText = (rate) => {
        if (rate === 100) return { text: '완료', color: '#28a745' };
        if (rate > 0) return { text: '작업 중', color: '#ffa500' };
        return { text: '대기 중', color: '#ff0000' };
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
                                <div className={`temperature ${getTemperatureClass(item.temperature)}`}>
                                    온도: {item.temperature}°C
                                </div>
                                <div className={`humidity ${getHumidityClass(item.humidity)}`}>
                                    습도: {item.humidity}%
                                </div>
                                <div className="status-indicator" style={{ color: getStatusText(item.productionRate).color, fontSize: '1.8em', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>
                                    {getStatusText(item.productionRate).text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductionMonitoringPage;
