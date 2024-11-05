import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const SalesDwtdAnalysisTable = () => {
    const [dayOfWeekSalesData, setDayOfWeekSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/sales-by-day");
                const data = await response.json();

                const formattedData = Object.keys(data).map(day => ({
                    name: day,
                    value: data[day]
                }));

                setDayOfWeekSalesData(formattedData);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'];

    return (
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
                    label={({ name, value }) => `${name}: ${value.toLocaleString()} 원`}
                    labelLine={false}
                >
                    {dayOfWeekSalesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toLocaleString()} 원`} />
            </PieChart>
        </div>
    );
};

export default SalesDwtdAnalysisTable;
