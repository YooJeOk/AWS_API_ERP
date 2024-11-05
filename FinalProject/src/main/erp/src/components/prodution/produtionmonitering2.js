import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialStages = [
    { label: "계량 완료", status: "대기", time: 10 },
    { label: "반죽 완료", status: "대기", time: 20 },
    { label: "1차 발효 완료", status: "대기", time: 60 },
    { label: "분할 완료", status: "대기", time: 10 },
    { label: "둥글리기 완료", status: "대기", time: 10 },
    { label: "중간 발효 완료", status: "대기", time: 30 },
    { label: "정형 완료", status: "대기", time: 10 },
    { label: "팬닝 완료", status: "대기", time: 10 },
    { label: "2차 발효 완료", status: "대기", time: 60 },
    { label: "굽기 완료", status: "대기", time: 30 },
    { label: "냉각 완료", status: "대기", time: 20 },
    { label: "포장 완료", status: "대기", time: 10 },
];

const totalProcessTime = initialStages.reduce((sum, stage) => sum + stage.time, 0);

const ProcessVisualization = ({ lineName, lineData }) => {
    const [stages, setStages] = useState(initialStages);
    const [remainingTime, setRemainingTime] = useState(
        lineData.status === "대기" ? 280 * 60 : parseInt(localStorage.getItem(`${lineName}_remainingTime`)) || totalProcessTime * 60
    );

    useEffect(() => {
        if (lineData.status === "대기") {
            setRemainingTime(280 * 60); // 280분을 초로 변환하여 고정
            return;
        }

        const savedStages = JSON.parse(localStorage.getItem(`${lineName}_stages`));
        if (savedStages) {
            setStages(savedStages);
        } else {
            const completedStages = Object.keys(lineData).filter(key => lineData[key] === true).length - 1;
            const completedTime = stages.slice(0, completedStages).reduce((total, stage) => total + stage.time, 0) * 60;
            setRemainingTime(totalProcessTime * 60 - completedTime);
            
            const updatedStages = initialStages.map((stage, index) => ({
                ...stage,
                status: index < completedStages ? "완료" : index === completedStages ? "작업중" : "대기",
                progress: index < completedStages ? 100 : 0,
            }));
            setStages(updatedStages);
        }
    }, [lineData, lineName]);

    useEffect(() => {
        if (lineData.status === "대기") return; // "대기" 상태인 경우 진행 멈춤

        const timer = setInterval(() => {
            setRemainingTime(prev => {
                const newRemainingTime = Math.max(prev - 1, 0);
                localStorage.setItem(`${lineName}_remainingTime`, newRemainingTime);
                return newRemainingTime;
            });
            setStages(prevStages => {
                const currentStageIndex = prevStages.findIndex(stage => stage.status === "작업중");
                if (currentStageIndex === -1) return prevStages;

                const updatedStages = [...prevStages];
                const currentStage = updatedStages[currentStageIndex];
                currentStage.progress = Math.min((currentStage.progress || 0) + (100 / currentStage.time / 60), 100);

                if (currentStage.progress >= 100) {
                    currentStage.status = "완료";
                    if (currentStageIndex + 1 < updatedStages.length) {
                        updatedStages[currentStageIndex + 1].status = "작업중";
                    }
                }
                localStorage.setItem(`${lineName}_stages`, JSON.stringify(updatedStages));
                return updatedStages;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [stages, lineName, lineData.status]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const lineStyle = {
        color: lineData.status === "경고" ? "#ff0000" : "#333",
        animation: lineData.status === "경고" ? "blink 1s infinite" : "none",
    };

    return (
        <div style={styles.processContainer}>
            <h3 style={{ ...styles.lineName, ...lineStyle }}>
                {lineName} 
                <span style={styles.remainingTime}>남은 시간: {formatTime(remainingTime)}</span>
            </h3>
            <div style={styles.pipeContainer}>
                <div style={styles.pipe}>
                    {stages.map((stage, index) => {
                        const stageWidth = (stage.time / totalProcessTime) * 100;
                        const leftPosition = (index === 0 ? 0 : (stages.slice(0, index).reduce((total, s) => total + s.time, 0) / totalProcessTime) * 100);
                        return (
                            <div
                                key={index}
                                style={{
                                    ...styles.pipeFill,
                                    left: `${leftPosition}%`,
                                    width: `${(stage.progress || 0) * (stageWidth / 100)}%`,
                                    backgroundColor: stage.status === "완료" ? "#77DD77" : stage.status === "작업중" ? "#B9E0FF" : "#ccc",
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <div style={styles.stages}>
                {stages.map((stage, index) => {
                    const statusClass = styles[stage.status.toLowerCase()] || {};
                    const stageWidth = (stage.time / totalProcessTime) * 100;

                    return (
                        <div key={index} style={{ ...styles.stage, width: `${stageWidth}%` }}>
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
    const [productionData, setProductionData] = useState([]);

    useEffect(() => {
        const fetchProductionData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/production-process-status/all');
                setProductionData(response.data);
            } catch (error) {
                console.error('Error fetching production data:', error);
            }
        };

        fetchProductionData();
    }, []);

    return (
        <div style={styles.productionLinesContainer}>
            <StatusLegend />
            {productionData.map(lineData => (
                <ProcessVisualization key={lineData.monitorID} lineName={`${lineData.monitorID}라인`} lineData={lineData} />
            ))}
        </div>
    );
};

const StatusLegend = () => {
    const statuses = [
        { name: "대기", color: "#ccc" },
        { name: "작업중", color: "#B9E0FF" },
        { name: "완료", color: "rgb(119, 221, 119)" },
        { name: "경고", color: "#ff0000" },
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

const styles = {
    productionLinesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '5px',
    },
    legendContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '10px',
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
        margin: '10px',
        paddingLeft: '100px',
    },
    lineName: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    remainingTime: {
        fontSize: '20px',
        marginTop: '10px',
        fontWeight: 'bold',
    },
    pipeContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: '10px',
        position: 'relative',
    },
    pipe: {
        position: 'relative',
        width: '100%',
        height: '8px',
        backgroundColor: '#ccc',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    pipeFill: {
        position: 'absolute',
        top: 0,
        height: '100%',
    },
    stages: {
        display: 'flex',
        width: '100%',
    },
    stage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    circle: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginBottom: '8px',
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
    },
    완료: {
        backgroundColor: 'rgb(119, 221, 119)',
    },
    경고: {
        backgroundColor: '#ff0000',
    },
    '@keyframes blink': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0.5 },
        '100%': { opacity: 1 },
    },
};

export default ProductionLines;
