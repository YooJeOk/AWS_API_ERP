import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';

import './ChartStyles.css';


const stages = [
    { label: "계량 완료", status: "대기" }, //10
    { label: "반죽 완료", status: "대기" }, //20 
    { label: "1차 발효 완료", status: "대기" }, //60 
    { label: "분할 완료", status: "대기" },  //10
    { label: "둥글리기 완료", status: "대기" }, //10
    { label: "중간 발효 완료", status: "대기" }, //30
    { label: "정형 완료", status: "대기" }, //10
    { label: "팬닝 완료", status: "대기" }, //10
    { label: "2차 발효 완료", status: "대기" },  //60
    { label: "굽기 완료", status: "대기" },  //30
    { label: "냉각 완료", status: "대기" },  //20
    { label: "포장 완료", status: "대기" },  //10
];

const ProcessVisualization = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 12 ? prev + 1 : 0));
        }, 5000); // 5초마다 단계 진행
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.processContainer}>
            <div style={styles.pipe}>
                <div
                    style={{
                        ...styles.pipeFill,
                        width: `${(progress / 12) * 100}%`,
                    }}
                />
            </div>
            <div style={styles.stages}>
                {stages.map((stage, index) => {
                    let status = "대기";
                    if (index < progress) status = "완료";
                    else if (index === progress) status = "작업중";

                    const statusClass = styles[status.toLowerCase()] || {};

                    return (
                        <div key={index} style={{ ...styles.stage, ...statusClass }}>
                            <div style={{ ...styles.circle, ...statusClass }} />
                            <span style={styles.label}>{stage.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// CSS 스타일을 JS 객체로 통합
const styles = {
    processContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
    },
    pipe: {
        position: 'relative',
        width: '90%',
        height: '8px',
        backgroundColor: '#ccc',
        borderRadius: '4px',
        marginBottom: '20px',
        overflow: 'hidden',
    },
    pipeFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: '#4caf50',
        transition: 'width 5s linear',
    },
    stages: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
    },
    stage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    circle: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        marginBottom: '8px',
        transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
        backgroundColor: '#ccc', // 대기 상태
    },
    label: {
        fontSize: '12px',
        textAlign: 'center',
    },
    작업중: {
        backgroundColor: 'blue',
        animation: 'pulse 1s infinite',
    },
    완료: {
        backgroundColor: 'green',
        boxShadow: '0 0 10px 5px rgba(0, 255, 0, 0.6)', // 전구처럼 켜지는 효과
    },
    "@keyframes pulse": {
        "0%, 100%": {
            transform: 'scale(1)',
        },
        "50%": {
            transform: 'scale(1.2)',
        },
    },
};

export default ProcessVisualization;
