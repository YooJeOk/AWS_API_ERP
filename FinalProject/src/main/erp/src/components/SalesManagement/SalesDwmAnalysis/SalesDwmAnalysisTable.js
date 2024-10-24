import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createChart } from 'lightweight-charts';
import '../../../css/SalesManagement/SalesDwmAnalysisTable.css';


const SalesDwmAnalysisTable = () => {
  const chartContainerRef = useRef();
  const chartInstanceRef = useRef();
  const [timePeriod, setTimePeriod] = useState('day');

  // 1년간의 일간 데이터 (더미 데이터)
  const dayData = [];
  for (let i = 1; i <= 365; i++) {
    const day = new Date(2024, 0, i); // 2024년의 각 날짜
    const formattedDate = day.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식
    const value = Math.floor(30000000 + Math.random() * 50000000); // 매출 데이터(더미)
    dayData.push({ time: formattedDate, value });
  }

  // 1년(52주) 동안의 주간 데이터
  const weekData = [];
  const startOfYear = new Date(2024, 0, 1); // 2024년 1월 1일
  for (let i = 0; i < 52; i++) {
    const startOfWeek = new Date(startOfYear);
    startOfWeek.setDate(startOfWeek.getDate() + i * 7); // 매주 7일씩 더하기
    const formattedDate = startOfWeek.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식
    const value = Math.floor(300000000 + Math.random() * 500000000); // 주간 매출 데이터(더미)
    weekData.push({ time: formattedDate, value });
  }

  // 월간 데이터를 ISO 날짜 형식으로 변환 (각 달의 첫 번째 날을 사용)
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

  // getData 함수 메모이제이션
  const getData = useCallback(() => {
    if (timePeriod === 'day') return dayData;
    if (timePeriod === 'week') return weekData;
    if (timePeriod === 'month') return monthData;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePeriod]);

  useEffect(() => {
    // 차트 생성
    const chart = createChart(chartContainerRef.current, {
      width: 1254,
      height: 400,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#703103',
      },
      grid: {
        vertLines: {
          color: 'white',
        },
        horzLines: {
          color: 'white',
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartInstanceRef.current = chart;

    // 막대형 차트 추가
    const barSeries = chart.addHistogramSeries({
      color: 'rgba(75, 192, 192, 1)', // 막대의 색상을 #703103으로 변경
      priceLineVisible: false, // 가격선 비활성화
    });

    // 막대형 차트 데이터 설정
    barSeries.setData(getData());
     // y축 레이블의 소수점 제거
     chart.priceScale('right').applyOptions({
      tickMarkFormatter: (value) => Math.floor(value), // 소수점 제거
    });

    // Cleanup on component unmount
    return () => {
      chart.remove();
    };
  }, [timePeriod, getData]);

  return (
    <div>
      {/* 일간/주간/월간 드롭다운 */}
      <div className="d-flex justify-content-end ">
        <select
           className="form-select m-2 custom-select" // custom-select 클래스 추가
          style={{ width: '100px', 
                   
           }}
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option value="day" className='custom-option'>일</option>
          <option value="week" className='custom-option'>주</option>
          <option value="month" className='custom-option'>월</option>
        </select>
      </div>

      {/* 차트 렌더링 공간 */}
      <div ref={chartContainerRef} style={{ width: '100%', height: '500px', position: 'relative' }} />
    </div>
  );
};

export default SalesDwmAnalysisTable;
