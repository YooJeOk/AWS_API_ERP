import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './ProductionPage.css';
import './ChartStyles.css';

function ProductionMonitoringPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = [
                { id: 1, productionRate: 100, temperature: 23, humidity: 58 },
                { id: 2, productionRate: 65, temperature: 27, humidity: 63 },
                { id: 3, productionRate: 0, temperature: 35, humidity: 75 },
                { id: 4, productionRate: 20, temperature: 21, humidity: 52 }
            ];
            setData(result);
        };
        fetchData();
    }, []);

    const COLORS = ['#FF0000', '#00FF00'];
    const statuses = [
        { label: '완료', color: '#28a745' },  // 초록색
        { label: '대기 중', color: '#ff0000' },  // 빨간색
        { label: '작업 중', color: '#ffa500' },  // 주황색
        { label: '준비 중', color: '#6c757d' }  // 회색 (추가된 상태)
    ];

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

    return (
        <div className="custom-container">
            <main className="production-content">
                <div className="chart-container">
                    {data.map((item, index) => (
                        <div key={item.id} className="chart-box">
                            <div className="pie-chart-container">
                                <h3 className="status-text" style={{ color: statuses[index].color }}>
                                    {statuses[index].label}
                                </h3>
                                <ResponsiveContainer width={350} height={300}>
                                    <PieChart>
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
                                </ResponsiveContainer>
                            </div>
                            <div className="metrics-container">
                                <div className={`temperature ${getTemperatureClass(item.temperature)}`}>
                                    온도: {item.temperature}°C
                                </div>
                                <div className={`humidity ${getHumidityClass(item.humidity)}`}>
                                    습도: {item.humidity}%
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
