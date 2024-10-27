package com.ERP.FinalProject.domain.production.planning.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ProductionPlanning", schema = "ERP")
public class ProductionPlanning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer planID;

    private Integer orderID;
    private Integer productID;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    
    // 기타 사항 필드 추가
    private String etc;

    // 계산 필드 (데이터베이스에 저장되지 않음)
    @Transient
    private Integer productionCalculation;

    @Transient
    private Integer mrpCalculation;

    // Getters and Setters
    public Integer getPlanID() {
        return planID;
    }

    public void setPlanID(Integer planID) {
        this.planID = planID;
    }

    public Integer getOrderID() {
        return orderID;
    }

    public void setOrderID(Integer orderID) {
        this.orderID = orderID;
    }

    public Integer getProductID() {
        return productID;
    }

    public void setProductID(Integer productID) {
        this.productID = productID;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getEtc() {
        return etc;
    }

    public void setEtc(String etc) {
        this.etc = etc;
    }

    public Integer getProductionCalculation() {
        return productionCalculation;
    }

    public void setProductionCalculation(Integer productionCalculation) {
        this.productionCalculation = productionCalculation;
    }

    public Integer getMrpCalculation() {
        return mrpCalculation;
    }

    public void setMrpCalculation(Integer mrpCalculation) {
        this.mrpCalculation = mrpCalculation;
    }
}
