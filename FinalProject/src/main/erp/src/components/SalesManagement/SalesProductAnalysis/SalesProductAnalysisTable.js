import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PDFIcon from '../../../img/PDF.png';  // 이미지 파일 경로

const ProductSalesAnalysis = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');
    const chartRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/sales-product-analysis?startDate=${startDate}&endDate=${endDate}`);
                const result = await response.json();

                const formattedData = result
                    .sort((a, b) => b.sales - a.sales)
                    .map((item, index) => ({
                        ...item,
                        rank: index + 1,
                        fill: index < 5 
                            ? ['#FFD700', '#C0C0C0', '#CD7F32', '#4682B4', '#6A5ACD'][index] 
                            : '#703103'
                    }));

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };
        fetchData();
    }, [startDate, endDate]);


    const downloadAsPDF = async () => {
        const canvas = await html2canvas(chartRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape");
        pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
        pdf.save("product_sales_analysis.pdf");
    };

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
                <button onClick={downloadAsPDF} style={{ border: 'none', outline: 'none', background: 'transparent',marginLeft: '680px'}}>
                <img src={PDFIcon} alt="Download as PDF" style={{ width: '45px', height: '45px' }} />
            </button>
            </div>

            <div ref={chartRef}>
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
                                fill={entry.fill}
                            />
                        ))}
                        <LabelList dataKey="name" position="insideRight" style={{ fill: 'white', fontSize: 12 }} />
                    </Bar>
                </BarChart>
            </div>

        </div>
    );
};

export default ProductSalesAnalysis;
