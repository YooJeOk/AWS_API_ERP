import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';
import '../../../css/SalesManagement/SalesProductAnalysis.css';

const ProductSalesAnalysis = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/sales-product-analysis?startDate=${startDate}&endDate=${endDate}`);
                const result = await response.json();

                // 판매량 내림차순 정렬 및 순위 추가
                const formattedData = result
                    .sort((a, b) => b.sales - a.sales)
                    .map((item, index) => ({
                        ...item,
                        rank: index + 1,
                        fill: index < 5 
                            ? ['#FFD700', '#C0C0C0', '#CD7F32', '#4682B4', '#6A5ACD'][index] // 1~5등 색상 지정
                            : '#703103' // 나머지 기본 색상
                    }));

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };
        fetchData();
    }, [startDate, endDate]);

    return (
        <div>
            <div style={{ marginBottom: '20px', color: '#F0C490', fontWeight: 'bold' }}>
                <label>
                    Start Date:
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="date-input"
                    />
                </label>
                <label style={{ marginLeft: '20px' }}>
                    End Date:
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="date-input"
                    />
                </label>
            </div>

            <BarChart
                width={1200}
                height={500}
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                barSize={15}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                    dataKey="rank" 
                    type="category"
                    tick={{ fontSize: 12 }}
                    width={50}
                />
                <Tooltip />
                <Bar dataKey="sales">
                    {data.map((entry, index) => (
                        <Bar 
                            key={index} 
                            dataKey="sales" 
                            fill={entry.fill} // 각 데이터 항목에 지정된 색상 사용
                        />
                    ))}
                    <LabelList dataKey="name" position="insideRight" style={{ fill: 'white', fontSize: 12 }} />
                </Bar>
            </BarChart>
        </div>
    );
};

export default ProductSalesAnalysis;
