package com.ERP.FinalProject.domain.production.monitoring.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
@Table(name = "ProductionMonitoring")  // 테이블 이름을 정확하게 지정
public class ProductionMonitoring {

    @Id
    @Column(name = "MonitorID")  // Primary Key
    private Long monitorId;

    @Column(name = "OrderID")
    private Integer orderId;

    @Column(name = "Temperature")
    private Float temperature;

    @Column(name = "Humidity")
    private Float humidity;

    @Column(name = "ProductionRate")
    private Float productionRate;

    @Column(name = "OperationTime")
    private Float operationTime;

    @Column(name = "StartTime")
    private String startTime;

    // Getters and Setters

    public Long getMonitorId() {
        return monitorId;
    }

    public void setMonitorId(Long monitorId) {
        this.monitorId = monitorId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Float getTemperature() {
        return temperature;
    }

    public void setTemperature(Float temperature) {
        this.temperature = temperature;
    }

    public Float getHumidity() {
        return humidity;
    }

    public void setHumidity(Float humidity) {
        this.humidity = humidity;
    }

    public Float getProductionRate() {
        return productionRate;
    }

    public void setProductionRate(Float productionRate) {
        this.productionRate = productionRate;
    }

    public Float getOperationTime() {
        return operationTime;
    }

    public void setOperationTime(Float operationTime) {
        this.operationTime = operationTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    @Override
    public String toString() {
        return "ProductionMonitoring [monitorId=" + monitorId + ", orderId=" + orderId + ", temperature=" + temperature
                + ", humidity=" + humidity + ", productionRate=" + productionRate + ", operationTime=" + operationTime
                + ", startTime=" + startTime + "]";
    }

    public ProductionMonitoring(Long monitorId, Integer orderId, Float temperature, Float humidity,
                                Float productionRate, Float operationTime, String startTime) {
        this.monitorId = monitorId;
        this.orderId = orderId;
        this.temperature = temperature;
        this.humidity = humidity;
        this.productionRate = productionRate;
        this.operationTime = operationTime;
        this.startTime = startTime;
    }

    public ProductionMonitoring() {
        super();
    }
}
