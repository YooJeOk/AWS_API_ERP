package com.ERP.FinalProject.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "Product", schema = "ERP")
@Data
public class ProductEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProductID")
    private Integer productId;
	
    @Column(name = "ProductName")
    private String productName;

    @Column(name = "ProductCategory")
    private String productCategory;

    @Column(name = "UnitPrice")
    private Integer unitPrice;

    @Column(name = "SalePrice")
    private Integer salePrice;

    @Column(name = "ProductionDate")
    private LocalDateTime productionDate;

    @Column(name = "ProductImage")
    private String productImage;

    @Column(name = "Recommend")
    private String recommend;

    @Column(name = "DetailDescription")
    private String detailDescription;
	
}
