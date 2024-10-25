package com.ERP.FinalProject.domain.production.monitoring.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class ProductionMonitoringData {

    @Id
    @Column(name = "id")  // Primary Key
    private Long id;

    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "temperature")
    private Float temperature;  // 변경됨

    @Column(name = "humidity")
    private Float humidity;  // 변경됨

    @Column(name = "production_rate")
    private Float productionRate;  // 변경됨

    @Column(name = "operation_time")
    private Float operationTime;  // 변경됨

    @Column(name = "start_time")
    private String startTime;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
        return "ProductionMonitoringData [id=" + id + ", orderId=" + orderId + ", temperature=" + temperature
                + ", humidity=" + humidity + ", productionRate=" + productionRate + ", operationTime=" + operationTime
                + ", startTime=" + startTime + "]";
    }

    public ProductionMonitoringData(Long id, Integer orderId, Float temperature, Float humidity,
            Float productionRate, Float operationTime, String startTime) {
        super();
        this.id = id;
        this.orderId = orderId;
        this.temperature = temperature;
        this.humidity = humidity;
        this.productionRate = productionRate;
        this.operationTime = operationTime;
        this.startTime = startTime;
    }

    public ProductionMonitoringData() {
        super();
    }

}
