import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const initialStages = [
    { label: "계량", status: "대기", time: 10, icon: "fas fa-balance-scale" },
    { label: "반죽", status: "대기", time: 20, icon: "fas fa-bread-slice" },
    { label: "1차 발효", status: "대기", time: 60, icon: "fas fa-wine-bottle" },
    { label: "분할", status: "대기", time: 10, icon: "fas fa-cut" },
    { label: "둥글리기", status: "대기", time: 10, icon: "fas fa-circle-notch" },
    { label: "중간 발효", status: "대기", time: 30, icon: "fas fa-hourglass-half" },
    { label: "정형", status: "대기", time: 10, icon: "fas fa-shapes" },
    { label: "팬닝", status: "대기", time: 10, icon: "fas fa-layer-group" },
    { label: "2차 발효", status: "대기", time: 60, icon: "fas fa-seedling" },
    { label: "굽기", status: "대기", time: 30, icon: "fas fa-fire" },
    { label: "냉각", status: "대기", time: 20, icon: "fas fa-snowflake" },
    { label: "포장", status: "대기", time: 10, icon: "fas fa-box-open" },
];

const totalProcessTime = initialStages.reduce((sum, stage) => sum + stage.time, 0);

const ProductionLines = () => {
    const [productionData, setProductionData] = useState([]);
    const [emergencyStopped, setEmergencyStopped] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertColor, setAlertColor] = useState("#ffcccb");

    useEffect(() => {
        const fetchProductionData = async () => {
            if (emergencyStopped) return;

            try {
                const response = await axios.get('http://localhost:8080/api/production-process-status/all');
                const modifiedData = response.data.map((line, index) => ({
                    ...line,
                    status: index === 0 ? "대기" : index === 1 ? "완료" : index === 2 ? "경고" : "생산중",
                    productName: index === 0 ? "갈릭꽈베기" : index === 1 ? "단팥도넛" : index === 2 ? "고구마케이크빵" : "꽈베기",
                }));
                setProductionData(modifiedData);
            } catch (error) {
                console.error('Error fetching production data:', error);
            }
        };

        fetchProductionData();
        const interval = setInterval(fetchProductionData, 10000);
        return () => clearInterval(interval);
    }, [emergencyStopped]);

    const showTemporaryAlert = (message, color) => {
        setAlertMessage(message);
        setAlertColor(color);
        setTimeout(() => setAlertMessage(""), 3000); // 3초 후에 알림 사라짐
    };

    const toggleEmergencyStop = () => {
        const isStopped = !emergencyStopped;
        setEmergencyStopped(isStopped);
        showTemporaryAlert(isStopped ? "비상정지 되었습니다." : "재가동 되었습니다.", isStopped ? "#ffcccb" : "#add8e6");
    };

    return (
        <div style={styles.productionLinesContainer}>
            {alertMessage && <div style={{ ...styles.alertMessage, backgroundColor: alertColor }}>{alertMessage}</div>}
            {productionData.map(lineData => (
                <div key={lineData.monitorID} style={styles.lineContainer}>
                    <ProcessVisualization 
                        lineName={`${lineData.monitorID}라인`} 
                        lineData={lineData} 
                        emergencyStopped={emergencyStopped}
                        toggleEmergencyStop={toggleEmergencyStop}
                    />
                </div>
            ))}
        </div>
    );
};

const ProcessVisualization = ({ lineName, lineData, emergencyStopped, toggleEmergencyStop }) => {
    const [stages, setStages] = useState(initialStages);
    const [remainingTime, setRemainingTime] = useState(
        lineData.status === "완료" ? 0 : lineData.status === "대기" ? 280 * 60 : parseInt(localStorage.getItem(`${lineName}_remainingTime`)) || totalProcessTime * 60
    );

    /*
    // 초기화 기능 주석 처리
    const resetLineStorage = () => {
        localStorage.removeItem(`${lineName}_remainingTime`);
        localStorage.removeItem(`${lineName}_stages`);
        setRemainingTime(280 * 60);
        setStages(initialStages);
    };
    */

    useEffect(() => {
        if (lineData.status === "완료") {
            setRemainingTime(0);
            const updatedStages = initialStages.map(stage => ({
                ...stage,
                status: "완료",
                progress: 100,
            }));
            setStages(updatedStages);
            return;
        }

        if (lineData.status === "대기") {
            setRemainingTime(280 * 60);
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
        if (lineData.status === "대기" || emergencyStopped || lineData.status === "완료") return;

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
    }, [stages, lineName, lineData.status, emergencyStopped]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const getBackgroundColor = () => {
        if (lineData.status === "경고") return "#ffe6e6"; // 연한 빨간색 배경
        if (lineData.status === "완료") return "#e6ffe6"; // 연한 초록색 배경
        if (lineData.status === "생산중") return "#e6f7ff"; // 연한 파란색 배경
        if (lineData.status === "대기") return "#f0f0f0"; // 연한 회색 배경
        return "transparent";
    };

    return (
        <div style={{ ...styles.processContainer, backgroundColor: getBackgroundColor() }}>
            <div style={styles.lineHeader}>
                <h3 style={{ ...styles.lineName, color: lineData.status === "경고" ? "#ff0000" : "#444" }}>
                    {lineName} 
                    {lineData.status === "경고" && <i className="fas fa-exclamation-triangle" style={{ color: "#ff0000", marginLeft: '10px' }} />}
                </h3>
                <span style={styles.status}>상태: {lineData.status}</span>
                <span style={styles.productName}>제품명: {lineData.productName}</span>
                <span style={styles.remainingTime}>남은 시간: {formatTime(remainingTime)}</span>
                {/* <button onClick={resetLineStorage} style={styles.resetButton}>초기화</button> */}
                {lineData.status === "경고" && (
                    <button onClick={toggleEmergencyStop} style={styles.emergencyStopButton}>
                        {emergencyStopped ? "재가동" : "비상정지"}
                    </button>
                )}
            </div>
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
                                    width: `${stageWidth}%`,
                                    backgroundColor: stage.status === "완료" ? "#32CD32" : stage.status === "작업중" ? "#4682B4" : "#ddd",
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
                            <div 
                                style={{ 
                                    ...styles.circle, 
                                    ...statusClass,
                                    backgroundColor: stage.status === "완료" ? "#32CD32" : "#A9D0F5",
                                    color: 'white',
                                }}>
                                <i className={stage.icon}></i>
                            </div>
                            <span style={styles.label}>{stage.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    productionLinesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '5px',
        marginLeft: '250px',
    },
    lineContainer: {
        position: 'relative',
        width: '95%',
        marginBottom: '20px',
    },
    processContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        margin: '15px 0',
        padding: '15px',
        borderRadius: '8px',
    },
    alertMessage: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffcccb',
        padding: '20px 40px',
        borderRadius: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#444',
        textAlign: 'center',
        zIndex: 1000,
    },
    lineHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: '5px',
        gap: '10px',
    },
    lineName: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    status: {
        fontSize: '18px',
        color: '#555',
    },
    productName: {
        fontSize: '18px',
        color: '#555',
    },
    remainingTime: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#444',
    },
    resetButton: {
        fontSize: '12px',
        padding: '3px 6px',
        opacity: 0.7,
        backgroundColor: '#ddd',
        border: 'none',
        cursor: 'pointer',
    },
    emergencyStopButton: {
        fontSize: '12px',
        padding: '3px 6px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
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
        backgroundColor: '#ddd',
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
        justifyContent: 'space-around',
        width: '100%',
    },
    stage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        padding: '0 5px',
    },
    circle: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginBottom: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: '12px',
        textAlign: 'center',
    },
    대기: {
        backgroundColor: '#ddd',
    },
    작업중: {
        backgroundColor: '#4682B4',
    },
    완료: {
        backgroundColor: '#32CD32',
    },
    경고: {
        backgroundColor: '#ff4d4d',
        animation: 'blink 1.5s infinite',
    },
    '@keyframes blink': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0.5 },
        '100%': { opacity: 1 },
    },
};

export default ProductionLines;
