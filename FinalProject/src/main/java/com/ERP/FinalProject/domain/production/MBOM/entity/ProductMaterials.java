package com.ERP.FinalProject.domain.production.MBOM.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "ProductMaterials", schema = "ERP")
@Data
public class ProductMaterials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProductID")
    private Integer productId;

    @Column(name = "MaterialID", nullable = false)
    private Integer materialId;

    @Column(name = "Quantity", nullable = false)
    private Float quantity;

    // Getters and setters

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Integer materialId) {
        this.materialId = materialId;
    }

    public Float getQuantity() {
        return quantity;
    }

    public void setQuantity(Float quantity) {
        this.quantity = quantity;
    }
}
