import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createChart } from 'lightweight-charts';

const SalesDwmAnalysisTable = React.forwardRef(({ showStats = true }, ref) => {
  const chartContainerRef = useRef();
  const [timePeriod, setTimePeriod] = useState('day');
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({ average: 0, max: 0, min: 0 });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/dwm?period=${timePeriod}`);
      const data = await response.json();
      const formattedData = data.map((d) => {
        const time = d.date || d.week || d.month;
        const formattedTime = time.length === 7 ? `${time}-01` : time;
        return { time: formattedTime, value: d.totalSales };
      });
      setChartData(formattedData);

      const values = formattedData.map((d) => d.value);
      const average = values.reduce((a, b) => a + b, 0) / values.length;
      const max = Math.max(...values);
      const min = Math.min(...values);
      setStats({ average, max, min });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [timePeriod]);

  useEffect(() => {
    fetchData();
  }, [timePeriod, fetchData]);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: { backgroundColor: '#ffffff', textColor: '#703103' },
      grid: { vertLines: { color: 'white' }, horzLines: { color: 'white' } },
      timeScale: { timeVisible: true, secondsVisible: false },
    });

    const barSeries = chart.addHistogramSeries({
      color: 'rgba(75, 192, 192, 1)',
      priceLineVisible: false,
    });
    barSeries.setData(chartData);

    const averageLineData = chartData.map((d) => ({
      time: d.time,
      value: stats.average,
    }));
    const lineSeries = chart.addLineSeries({
      color: 'rgba(255, 99, 132, 1)',
      lineWidth: 2,
    });
    lineSeries.setData(averageLineData);

    const resizeChart = () => {
      if (chartContainerRef.current) {
        chart.resize(chartContainerRef.current.clientWidth, 400);
      }
    };
    resizeChart();
    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      chart.remove();
    };
  }, [chartData, stats.average]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('ko-KR', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div ref={ref}>
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

      {showStats && (
        <div className="stats" style={{ color: '#703103', fontWeight: 'bold' }}>
          <p>평균 매출: {formatCurrency(stats.average)} 원</p>
          <p>최고 매출: {formatCurrency(stats.max)} 원</p>
          <p>최저 매출: {formatCurrency(stats.min)} 원</p>
        </div>
      )}

      <div ref={chartContainerRef} style={{ width: '100%', height: '400px', position: 'relative' }} />
    </div>
  );
});

export default SalesDwmAnalysisTable;
