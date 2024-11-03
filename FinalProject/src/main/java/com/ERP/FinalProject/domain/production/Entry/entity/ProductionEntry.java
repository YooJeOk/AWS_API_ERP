package com.ERP.FinalProject.domain.production.Entry.entity;

import javax.persistence.*;

import lombok.Data;

import java.util.Date;

@Entity
@Data
public class ProductionEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer EntryID; // 입고 ID (기본 키)

    @Column(nullable = false)
    private Integer QCID; // 품질관리 ID

    @Column(nullable = false)
    private Integer OrderID; // 주문 ID

    @Column(nullable = false)
    private Integer quantity; // 수량

    @Column(nullable = false)
    private Integer productId; // 상품 ID

    @Column(nullable = false, length = 100)
    private String productName; // 상품명

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date entryDate; // 입고 날짜

    @Column(length = 100)
    private String etc; // 기타 정보

    // Getters and Setters

    public Integer getEntryId() {
        return entryId;
    }

    public void setEntryId(Integer entryId) {
        this.entryId = entryId;
    }

    public Integer getQcid() {
        return qcid;
    }

    public void setQcid(Integer qcid) {
        this.qcid = qcid;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
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

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public String getEtc() {
        return etc;
    }

    public void setEtc(String etc) {
        this.etc = etc;
    }
}

