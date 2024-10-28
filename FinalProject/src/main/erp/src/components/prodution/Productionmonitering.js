import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './ProductionPage.css';
import './ChartStyles.css';

function ProductionMonitoringPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/production-monitoring');
                const result = await response.json();

                const modifiedData = result.map((item) => {
                    if (item.orderId === 1) {
                        return { ...item, productionRate: 4 };
                    }
                    return item;
                });

                console.log("Modified Data:", modifiedData);
                setData(modifiedData);
            } catch (error) {
                console.error("Error fetching production data:", error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

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
                    {lineNames.map((lineName, index) => {
                        const item = data.find(d => d.orderId === index + 1) || {};
                        const status = getStatusText(item.productionRate || 0);

                        return (
                            <div key={index} className="chart-box">
                                <div className="pie-chart-container">
                                    <h3 className="line-name" style={{ fontSize: '2em', fontWeight: 'bold', textAlign: 'center' }}>
                                        {lineName}
                                    </h3>
                                    <PieChart width={350} height={300}>
                                        <Pie
                                            data={[
                                                { name: '생산률', value: item.productionRate || 0 },
                                                { name: '남은 비율', value: 100 - (item.productionRate || 0) }
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
                                            <Cell fill="#28a745" /> 
                                            <Cell fill="#FF0000" /> 
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
                                            {item.productionRate || 0}%
                                        </text>
                                    </PieChart>
                                </div>
                                <div className="metrics-container">
                                    <div className={`temperature ${getTemperatureClass(item.temperature || 0)}`}>
                                        온도: {item.temperature || 0}°C
                                    </div>
                                    <div className={`humidity ${getHumidityClass(item.humidity || 0)}`}>
                                        습도: {item.humidity || 0}%
                                    </div>
                                </div>
                                <div className="status-indicator" style={{ color: status.color, fontSize: '5em', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>
                                    {status.text}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default ProductionMonitoringPage;
