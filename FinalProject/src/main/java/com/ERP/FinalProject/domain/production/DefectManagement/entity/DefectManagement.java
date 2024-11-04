package com.ERP.FinalProject.domain.production.DefectManagement.entity;

import javax.persistence.*;

@Entity
@Table(name = "DefectManagement")
public class DefectManagement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DefectID")
    private int defectId;

    @Column(name = "QCID", nullable = false)
    private int qcid;

    @Column(name = "OrderID", nullable = false)
    private int orderId;

    @Column(name = "Quantity", nullable = false)
    private int quantity;

    @Column(name = "ProductID", nullable = false)
    private int productId;

    @Column(name = "ProductName", nullable = false, length = 100)
    private String productName;

    @Column(name = "DefectType", nullable = false, length = 50)
    private String defectType;

    @Column(name = "DefectQuantity", nullable = false)
    private int defectQuantity;

    @Column(name = "CauseDescription", length = 255)
    private String causeDescription;

    @Column(name = "Status", columnDefinition = "ENUM('미처리', '완료') DEFAULT '미처리'")
    private String status;

    @Column(name = "Defectrate", nullable = true)
    private Integer defectRate;

    @Column(name = "etc", length = 100)
    private String etc;

    // 기본 생성자
    public DefectManagement() {}

    // Getter 및 Setter 메서드

    public int getDefectId() {
        return defectId;
    }

    public void setDefectId(int defectId) {
        this.defectId = defectId;
    }

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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
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

    public String getDefectType() {
        return defectType;
    }

    public void setDefectType(String defectType) {
        this.defectType = defectType;
    }

    public int getDefectQuantity() {
        return defectQuantity;
    }

    public void setDefectQuantity(int defectQuantity) {
        this.defectQuantity = defectQuantity;
    }

    public String getCauseDescription() {
        return causeDescription;
    }

    public void setCauseDescription(String causeDescription) {
        this.causeDescription = causeDescription;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getDefectRate() {
        return defectRate;
    }

    public void setDefectRate(Integer defectRate) {
        this.defectRate = defectRate;
    }

    public String getEtc() {
        return etc;
    }

    public void setEtc(String etc) {
        this.etc = etc;
    }
}
