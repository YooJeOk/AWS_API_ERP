import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import '../../../css/SalesManagement/SalesProductAnalysis.css'
const ProductSalesAnalysis = () => {
    const data = [
        { name: 'Bread A', sales: 70, date: '2024-10-01' },
        { name: 'Bread B', sales: 65, date: '2024-10-02' },
        { name: 'Bread C', sales: 60, date: '2024-10-03' },
        { name: 'Bread D', sales: 55, date: '2024-10-04' },
        { name: 'Bread E', sales: 50, date: '2024-10-05' },
        { name: 'Bread F', sales: 45, date: '2024-10-06' },
        { name: 'Bread G', sales: 40, date: '2024-10-07' },
        { name: 'Bread H', sales: 35, date: '2024-10-08' },
        { name: 'Bread I', sales: 30, date: '2024-10-09' },
        { name: 'Bread J', sales: 25, date: '2024-10-10' },
        { name: 'Bread K', sales: 20, date: '2024-10-11' },
        { name: 'Bread L', sales: 15, date: '2024-10-12' },
        { name: 'Bread M', sales: 10, date: '2024-10-13' },
        { name: 'Coffee A', sales: 70, date: '2024-10-01' },
        { name: 'Coffee B', sales: 65, date: '2024-10-02' },
        { name: 'Coffee C', sales: 60, date: '2024-10-03' },
        { name: 'Coffee D', sales: 55, date: '2024-10-04' },
        { name: 'Coffee E', sales: 50, date: '2024-10-05' },
        { name: 'Coffee F', sales: 45, date: '2024-10-06' },
        { name: 'Coffee G', sales: 40, date: '2024-10-07' },
        { name: 'Coffee H', sales: 35, date: '2024-10-08' },
        { name: 'Coffee I', sales: 30, date: '2024-10-09' },
        { name: 'Coffee J', sales: 25, date: '2024-10-10' },
        { name: 'Coffee K', sales: 20, date: '2024-10-11' },
        { name: 'Coffee L', sales: 15, date: '2024-10-12' },
        { name: 'Coffee M', sales: 10, date: '2024-10-13' },
    ];

    const [startDate, setStartDate] = useState('2024-10-01'); // 시작 날짜 초기값
    const [endDate, setEndDate] = useState('2024-10-13'); // 종료 날짜 초기값

    // 날짜 범위 내의 데이터만 필터링
    const filteredData = data
        .filter((item) => item.date >= startDate && item.date <= endDate)
        .sort((a, b) => b.sales - a.sales) // 내림차순 정렬
        .map((item, index) => ({ ...item, rank: index + 1 })); // 순위 추가
   

    return (





        <div>
            {/* 기간 선택 기능 */}
            <div style={{ marginBottom: '20px', color:'#F0C490', fontWeight: 'bold' }}>
                <label>
                    Start Date: 
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="date-input"  // CSS 클래스 추가
                    />
                </label>
                <label style={{ marginLeft: '20px' }}>
                    End Date: 
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="date-input"  // CSS 클래스 추가
                    />
                </label>
            </div>

            {/* 판매량 그래프 */}
            <BarChart
                width={1200}
                height={500}
                data={filteredData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                barSize={15}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                    dataKey="rank" // Y축에 순위를 표시
                    type="category"
                    tick={{ fontSize: 12 }}  // 텍스트 크기 설정
                    width={50}  // Y축 텍스트 영역 넓이
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#703103">
                    <LabelList dataKey="name" position="insideRight" angle={0} style={{ fill: 'white', fontSize: 12 }} />  
                </Bar>
            </BarChart>
        </div>



    );
};

export default ProductSalesAnalysis;
