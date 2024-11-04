import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductionAlert = () => {
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // API로부터 실시간 데이터를 가져오는 함수
    const checkAlerts = async () => {
      try {
        const response = await axios.get('/api/production/alerts');  // 경고 데이터를 가져옴
        setAlertMessage(response.data);  // 가져온 데이터를 상태로 설정
      } catch (error) {
        console.error('경고를 가져오는 중 오류 발생:', error);
      }
    };

    // 10초마다 경고 데이터를 주기적으로 가져옴
    const interval = setInterval(checkAlerts, 10000);  // 10초마다 API 호출
    return () => clearInterval(interval);  // 컴포넌트 언마운트 시 인터벌 해제
  }, []);

  return (
    <div>
      <h1>실시간 경고 시스템</h1>
      <p>{alertMessage}</p>
    </div>
  );
};

export default ProductionAlert;
