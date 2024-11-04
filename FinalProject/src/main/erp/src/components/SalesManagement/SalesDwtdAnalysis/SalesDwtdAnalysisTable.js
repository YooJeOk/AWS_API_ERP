import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../../../css/SalesManagement/SalesDwtdAnalysisTable.css';

const SalesDwtdAnalysisTable = () => {
    // 예시 데이터: 요일별 매출
    const dayOfWeekSalesDataRaw = [500, 700, 400, 900, 650, 800, 300];

    // 요일별 매출 비율 계산
    const totalDaySales = dayOfWeekSalesDataRaw.reduce((acc, curr) => acc + curr, 0);
    const dayOfWeekSalesData = [
        { name: '일요일', value: (500 / totalDaySales) * 100 },
        { name: '월요일', value: (700 / totalDaySales) * 100 },
        { name: '화요일', value: (400 / totalDaySales) * 100 },
        { name: '수요일', value: (900 / totalDaySales) * 100 },
        { name: '목요일', value: (650 / totalDaySales) * 100 },
        { name: '금요일', value: (800 / totalDaySales) * 100 },
        { name: '토요일', value: (300 / totalDaySales) * 100 },
    ];

    // 예시 데이터: 시간대별 매출 (실제 매출 금액 사용)
    const timeOfDaySalesData = [
        { time: '00:00', sales: 30 },
        { time: '01:00', sales: 20 },
        { time: '02:00', sales: 50 },
        { time: '03:00', sales: 70 },
        { time: '04:00', sales: 90 },
        { time: '05:00', sales: 60 },
        { time: '06:00', sales: 100 },
        { time: '07:00', sales: 120 },
        { time: '08:00', sales: 140 },
        { time: '09:00', sales: 160 },
        { time: '10:00', sales: 180 },
        { time: '11:00', sales: 200 },
        { time: '12:00', sales: 220 },
        { time: '13:00', sales: 240 },
        { time: '14:00', sales: 260 },
        { time: '15:00', sales: 280 },
        { time: '16:00', sales: 300 },
        { time: '17:00', sales: 320 },
        { time: '18:00', sales: 340 },
        { time: '19:00', sales: 360 },
        { time: '20:00', sales: 380 },
        { time: '21:00', sales: 400 },
        { time: '22:00', sales: 420 },
        { time: '23:00', sales: 440 },
    ];

    // 색상 배열
    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'];

    // 사용자 정의 라벨 함수 (요일과 매출 비율을 함께 표시)
    const renderCustomLabel = ({ name, value }) => `${name}: ${value.toFixed(2)}%`;

    return (
        <div className="sales-dashboard">
            {/* 요일별 매출 파이 차트 */}
            <div className="daychart-container">
                <h3 className="daychart-title"> 요일별 매출 그래프</h3>
                <PieChart width={600} height={400}>
                    <Pie
                        data={dayOfWeekSalesData}
                        cx={300}  // x축의 중심을 중앙으로 조정
                        cy={200}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomLabel}  // 사용자 정의 라벨
                        labelLine={false}  // 라벨 선을 제거
                    >
                        {dayOfWeekSalesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                </PieChart>
            </div>

            {/* 시간대별 매출 라인 그래프 */}
            <div className="timechart-container">
                <h3 className="timechart-title">시간대 매출 그래프</h3>
                <LineChart
                    width={500}
                    height={400}
                    data={timeOfDaySalesData}
                    margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />  {/* Y축을 실제 매출 금액으로 표시 */}
                    <Tooltip formatter={(value) => `${value} 원`} />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default SalesDwtdAnalysisTable;
