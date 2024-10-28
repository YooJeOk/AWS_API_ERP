import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createChart } from 'lightweight-charts';
import '../../../css/SalesManagement/SalesDwmAnalysisTable.css';

const SalesDwmAnalysisTable = () => {
  const chartContainerRef = useRef();
  const chartInstanceRef = useRef();
  const [timePeriod, setTimePeriod] = useState('day');

  const dayData = Array.from({ length: 365 }, (_, i) => ({
    time: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    value: Math.floor(30000000 + Math.random() * 50000000),
  }));

  const weekData = Array.from({ length: 52 }, (_, i) => ({
    time: new Date(2024, 0, 1 + i * 7).toISOString().split('T')[0],
    value: Math.floor(300000000 + Math.random() * 500000000),
  }));

  const monthData = [
    { time: '2024-01-01', value: 1500000000 },
    { time: '2024-02-01', value: 1600000000 },
    { time: '2024-03-01', value: 1800000000 },
    { time: '2024-04-01', value: 1700000000 },
    { time: '2024-05-01', value: 1750000000 },
    { time: '2024-06-01', value: 1650000000 },
    { time: '2024-07-01', value: 1800000000 },
    { time: '2024-08-01', value: 1900000000 },
    { time: '2024-09-01', value: 1850000000 },
    { time: '2024-10-01', value: 1950000000 },
    { time: '2024-11-01', value: 2000000000 },
    { time: '2024-12-01', value: 2100000000 },
  ];

  const getData = useCallback(() => {
    if (timePeriod === 'day') return dayData;
    if (timePeriod === 'week') return weekData;
    if (timePeriod === 'month') return monthData;
  }, [timePeriod]);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: { backgroundColor: '#ffffff', textColor: '#703103' },
      grid: { vertLines: { color: 'white' }, horzLines: { color: 'white' } },
      timeScale: { timeVisible: true, secondsVisible: false },
    });
    chartInstanceRef.current = chart;

    const barSeries = chart.addHistogramSeries({
      color: 'rgba(75, 192, 192, 1)',
      priceLineVisible: false,
    });
    barSeries.setData(getData());

    chart.priceScale('right').applyOptions({
      tickMarkFormatter: (value) => Math.floor(value),
    });

    // 차트 리사이즈 함수
    const resizeChart = () => {
      if (chartContainerRef.current) {
        chart.resize(chartContainerRef.current.clientWidth, 400); // 높이는 400px로 고정
      }
    };

    resizeChart(); // 초기 렌더링 시 크기 조정
    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      chart.remove();
    };
  }, [timePeriod, getData]);

  return (
    <div>
      <div className="d-flex justify-content-end">
        <select
          className="form-select m-2 custom-select"
          style={{ width: '100px' }}
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option value="day">일</option>
          <option value="week">주</option>
          <option value="month">월</option>
        </select>
      </div>

      <div ref={chartContainerRef} style={{ width: '100%', height: '400px', position: 'relative' }} />
    </div>
  );
};

export default SalesDwmAnalysisTable;
