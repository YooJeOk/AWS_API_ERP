import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Chart.js에서 자동으로 필요한 요소를 불러옴
import './0/ProductionPage.css'; 

function ProductionPage9() {
    const [chartData, setChartData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            // 10월 1일부터 10월 31일까지 날짜 데이터 생성
            const daysInMonth = Array.from({ length: 31 }, (_, i) => `2024-10-${i + 1}`);

            const dummyData = {
                labels: daysInMonth,
                datasets: [
                    {
                        label: '생산지시된 양 (단위: 개)',
                        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 150) + 50),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        fill: true,
                    },
                    {
                        label: '생산된 양 (단위: 개)',
                        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 150) + 50),
                        borderColor: 'rgba(0,255,0,1)',
                        backgroundColor: 'rgba(0,255,255,0.2)',
                        fill: true,
                    },
                    {
                        label: '불량 갯수',
                        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20) + 5),
                        borderColor: 'rgba(255,99,132,1)',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        fill: true,
                    }
                ]
            };
            setChartData(dummyData);
            setIsDataLoaded(true);
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container" style={{ marginLeft: '250px' }}> {/* 차트를 오른쪽으로 조금 이동 */}
            {isDataLoaded ? (
                <Line data={chartData} options={{
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductionPage9;
