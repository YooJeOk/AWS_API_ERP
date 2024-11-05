import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const SalesDwtdAnalysisTable = () => {
    const [dayOfWeekSalesData, setDayOfWeekSalesData] = useState([]);
    const [hourlyAverageSalesData, setHourlyAverageSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                // 요일별 매출 데이터
                const dayResponse = await fetch("http://localhost:8080/api/sales-by-day");
                const dayData = await dayResponse.json();
                const totalSales = Object.values(dayData).reduce((acc, curr) => acc + curr, 0);
                const formattedDayData = Object.keys(dayData).map(day => ({
                    name: day,
                    value: parseFloat(((dayData[day] / totalSales) * 100).toFixed(2))
                }));
                setDayOfWeekSalesData(formattedDayData);

                // 시간대별 평균 매출 데이터
                const timeResponse = await fetch("http://localhost:8080/api/sales-by-hour");
                const timeData = await timeResponse.json();
                const formattedHourlyData = Object.keys(timeData).map(hour => ({
                    hour: `${hour}:00`,
                    avgSales: Math.round(timeData[hour]) // 소수점 없는 값으로 변환
                }));
                setHourlyAverageSalesData(formattedHourlyData);

            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'];

    return (
        <div className="sales-dashboard" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {/* 요일별 매출 파이 차트 */}
            <div className="daychart-container" style={{ width: '50%', alignItems: 'center' }}>
                <h3 className="daychart-title">요일별 매출 비율</h3>
                <PieChart width={520} height={300}>
                    <Pie
                        data={dayOfWeekSalesData}
                        cx={250}  // x축 위치를 중앙에서 오른쪽으로 조정
                        cy={150}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                    >
                        {dayOfWeekSalesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
            </div>

            {/* 시간대별 평균 매출 라인 차트 */}
            <div className="timechart-container" style={{ width: '50%' }}>
                <h3 className="timechart-title">시간대별 평균 매출</h3>
                <LineChart
                    width={500}
                    height={300}
                    data={hourlyAverageSalesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis label={{ value: '평균 매출 (원)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => `${value} 원`} />
                    <Legend />
                    <Line type="monotone" dataKey="avgSales" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default SalesDwtdAnalysisTable;
