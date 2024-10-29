import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ProductionPage.css';

function ProductionPage9() {
    const [chartData, setChartData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const daysInMonth = Array.from({ length: 31 }, (_, i) => `2024-10-${i + 1}`);
            const data = daysInMonth.map((day) => ({
                date: day,
                scheduledProduction: Math.floor(Math.random() * 150) + 50,
                actualProduction: Math.floor(Math.random() * 150) + 50,
                defects: Math.floor(Math.random() * 20) + 5
            }));
            setChartData(data);
            setIsDataLoaded(true);
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container" style={{ width: '80%', height: '700px', margin: '0 auto' }}> {/* 너비와 높이 조절 */}
            {isDataLoaded ? (
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="scheduledProduction" barSize={20} fill="#A6CEE3" name="생산지시된 양" />  {/* 파스텔 블루 */}
                        <Bar dataKey="actualProduction" barSize={20} fill="#B2DF8A" name="생산된 양" />  {/* 파스텔 그린 */}
                        <Line type="monotone" dataKey="defects" stroke="#FB9A99" name="불량 갯수" />  {/* 파스텔 핑크 */}
                    </ComposedChart>
                </ResponsiveContainer>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductionPage9;
