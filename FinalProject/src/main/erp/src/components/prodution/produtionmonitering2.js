import React, { useState, useEffect } from 'react';
import './ChartStyles.css';

const stages = [
    { label: "계량 완료", status: "대기" },
    { label: "반죽 완료", status: "대기" },
    { label: "1차 발효 완료", status: "대기" },
    { label: "분할 완료", status: "대기" },
    { label: "둥글리기 완료", status: "대기" },
    { label: "중간 발효 완료", status: "대기" },
    { label: "정형 완료", status: "대기" },
    { label: "팬닝 완료", status: "대기" },
    { label: "2차 발효 완료", status: "대기" },
    { label: "굽기 완료", status: "대기" },
    { label: "냉각 완료", status: "대기" },
    { label: "포장 완료", status: "대기", isEnd: true },
];

// 상태별 색상과 상태 이름 표시
const StatusLegend = () => {
    const statuses = [
        { name: "대기", color: "#ccc" },
        { name: "작업중", color: "#B9E0FF" },
        { name: "완료", color: "rgb(119, 221, 119)" },
        { name: "경고", color: "#ffa500" },
        { name: "위험", color: "#ff0000" },
    ];

    return (
        <div style={styles.legendContainer}>
            {statuses.map((status) => (
                <div key={status.name} style={styles.legendItem}>
                    <div style={{ ...styles.legendCircle, backgroundColor: status.color }} />
                    <span style={styles.legendLabel}>{status.name}</span>
                </div>
            ))}
        </div>
    );
};

const ProcessVisualization = ({ lineName }) => {
    const [progress, setProgress] = useState(0);
    const [lineStatus, setLineStatus] = useState("대기");

    useEffect(() => {
        const interval = setInterval(() => {
            const newProgress = progress < stages.length - 1 ? progress + 1 : 0;
            setProgress(newProgress);

            // 진행 상태를 업데이트
            if (newProgress === stages.length - 2) setLineStatus("경고");
            else if (newProgress === stages.length - 1) setLineStatus("위험");
            else if (newProgress > 0) setLineStatus("작업중");
            else setLineStatus("대기");
        }, 10000);
        return () => clearInterval(interval);
    }, [progress]);

    return (
        <div style={styles.processContainer}>
            <h3 style={styles.lineName}>
                {lineName} <span style={{ ...styles.statusLabel, color: styles[lineStatus].backgroundColor }}>{lineStatus}</span>
            </h3>
            <div style={styles.pipe}>
                <div
                    style={{
                        ...styles.pipeFill,
                        width: `${(progress / stages.length) * 100}%`,
                    }}
                />
            </div>
            <div style={styles.stages}>
                {stages.map((stage, index) => {
                    let status = "대기";
                    if (index < progress) status = "완료";
                    else if (index === progress) status = lineStatus === "경고" ? "경고" : "작업중";

                    const statusClass = styles[status.toLowerCase()] || {};
                    const isEndStyle = stage.isEnd ? styles.endStage : {};

                    return (
                        <div key={index} style={{ ...styles.stage, ...isEndStyle }}>
                            <div style={{ ...styles.circle, ...statusClass }} />
                            <span style={styles.label}>{stage.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ProductionLines = () => {
    return (
        <div style={styles.productionLinesContainer}>
            <StatusLegend />
            <ProcessVisualization lineName="1 라인" />
            <ProcessVisualization lineName="2 라인" />
            <ProcessVisualization lineName="3 라인" />
            <ProcessVisualization lineName="4 라인" />
        </div>
    );
};

const styles = {
    productionLinesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px', 
        padding: '10px',
    },
    legendContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '20px',
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
    },
    legendCircle: {
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        marginRight: '5px',
    },
    legendLabel: {
        fontSize: '14px',
    },
    processContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        margin: '20px',
        marginLeft: '250px',
    },
    lineName: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    statusLabel: {
        fontSize: '18px',
        marginLeft: '10px',
        fontWeight: 'bold',
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
        transition: 'width 10s linear',
    },
    stages: {
        display: 'flex',
        width: '90%',
    },
    stage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    endStage: {
        marginLeft: 'auto',
        flex: 'unset',
    },
    circle: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginBottom: '8px',
        transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
    },
    label: {
        fontSize: '14px',
        textAlign: 'center',
    },
    대기: {
        backgroundColor: '#ccc',
    },
    작업중: {
        backgroundColor: '#B9E0FF',
        animation: 'pulse 1s infinite',
    },
    완료: {
        backgroundColor: 'rgb(119, 221, 119)',
    },
    경고: {
        backgroundColor: '#ffa500',
    },
    위험: {
        backgroundColor: '#ff0000',
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

export default ProductionLines;
