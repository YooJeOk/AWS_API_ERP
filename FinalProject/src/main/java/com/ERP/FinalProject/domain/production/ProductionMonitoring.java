package com.ERP.FinalProject.domain.production;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ProductionMonitoring")  // 테이블 이름을 지정
public class ProductionMonitoring {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;  // 작업 지시 번호
    private Double temperature;  // 작업장 온도
    private Integer humidity;  // 작업장 습도
    private Integer productionRate;  // 생산율 (예: 83%)
    private Integer operationTime;  // 가동 시간 (분 단위)
    
    @Column(name = "startTime")
    private LocalDateTime startTime;  // 작업 시작 시간

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Integer getHumidity() {
        return humidity;
    }

    public void setHumidity(Integer humidity) {
        this.humidity = humidity;
    }

    public Integer getProductionRate() {
        return productionRate;
    }

    public void setProductionRate(Integer productionRate) {
        this.productionRate = productionRate;
    }

    public Integer getOperationTime() {
        return operationTime;
    }

    public void setOperationTime(Integer operationTime) {
        this.operationTime = operationTime;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
}

