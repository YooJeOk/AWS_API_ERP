package com.ERP.FinalProject.domain.production.Entry.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class ProductionEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer entryId; // 자동 증가하는 입고 ID

    private Integer orderId;
    private Integer qcid;
    private Integer quantity;
    private Integer productId;
    private String productName;
    private LocalDate entryDate;
    private String etc;

    // 기본 생성자
    public ProductionEntry() {
    }

    // Getters and Setters
    public Integer getEntryId() {
        return entryId;
    }

    public void setEntryId(Integer entryId) {
        this.entryId = entryId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getQcid() {
        return qcid;
    }

    public void setQcid(Integer qcid) {
        this.qcid = qcid;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public String getEtc() {
        return etc;
    }

    public void setEtc(String etc) {
        this.etc = etc;
    }
}
