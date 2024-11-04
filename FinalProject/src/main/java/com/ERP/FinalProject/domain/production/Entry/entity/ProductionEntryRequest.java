package com.ERP.FinalProject.domain.production.Entry.entity;

import java.time.LocalDate;

public class ProductionEntryRequest {
    private int qcid;
    private int orderId;
    private int productId;
    private String productName;
    private int quantity;
    private int defectQuantity; // 불량 수량 추가
    private LocalDate entryDate;
    private String etc;

    // Getters and Setters

    public int getQcid() {
        return qcid;
    }

    public void setQcid(int qcid) {
        this.qcid = qcid;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getDefectQuantity() {
        return defectQuantity;
    }

    public void setDefectQuantity(int defectQuantity) {
        this.defectQuantity = defectQuantity;
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
