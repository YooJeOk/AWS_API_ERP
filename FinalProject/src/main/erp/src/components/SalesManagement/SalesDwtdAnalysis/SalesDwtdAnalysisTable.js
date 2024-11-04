import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import '../../../css/SalesManagement/SalesDwtdAnalysisTable.css';

const SalesDwtdAnalysisTable = () => {
    const [dayOfWeekSalesData, setDayOfWeekSalesData] = useState([]);
    
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/salesdata");  // 매출 데이터를 가져오는 API 엔드포인트
                const data = await response.json();

                // 요일별 매출 초기화
                const salesByDay = [0, 0, 0, 0, 0, 0, 0]; // 일요일 ~ 토요일 매출 배열 초기화

                data.forEach(record => {
                    const saleDate = new Date(record.saleDate);
                    const dayOfWeek = saleDate.getDay();  // getDay()로 요일을 숫자로 반환 (0: 일요일, 1: 월요일, ..., 6: 토요일)
                    salesByDay[dayOfWeek] += record.totalSalePrice;  // 요일별로 매출 합산
                });

                // 요일 데이터로 변환 (이름과 매출 비율)
                const totalSales = salesByDay.reduce((acc, curr) => acc + curr, 0);
                const dayOfWeekSales = [
                    { name: '일요일', value: (salesByDay[0] / totalSales) * 100 },
                    { name: '월요일', value: (salesByDay[1] / totalSales) * 100 },
                    { name: '화요일', value: (salesByDay[2] / totalSales) * 100 },
                    { name: '수요일', value: (salesByDay[3] / totalSales) * 100 },
                    { name: '목요일', value: (salesByDay[4] / totalSales) * 100 },
                    { name: '금요일', value: (salesByDay[5] / totalSales) * 100 },
                    { name: '토요일', value: (salesByDay[6] / totalSales) * 100 },
                ];

                setDayOfWeekSalesData(dayOfWeekSales);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'];

    return (
        <div className="sales-dashboard">
            <div className="daychart-container">
                <h3 className="daychart-title">요일별 매출 그래프</h3>
                <PieChart width={600} height={400}>
                    <Pie
                        data={dayOfWeekSalesData}
                        cx={300}
                        cy={200}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
                        labelLine={false}
                    >
                        {dayOfWeekSalesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                </PieChart>
            </div>
        </div>
    );
};

export default SalesDwtdAnalysisTable;
