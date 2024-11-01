package com.ERP.FinalProject.domain.SalesManagement.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "SalesManagementSalesDetail")
@Table(name = "SalesDetails")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SaleDetailID")
    private int detailID;

    @ManyToOne
    @JoinColumn(name = "SaleID", insertable = false, updatable = false)
    private SalesRecord salesRecord;

    @ManyToOne
    @JoinColumn(name = "ProductID", referencedColumnName = "productID", nullable = true)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "CoffeeID", referencedColumnName = "coffeeID", nullable = true)
    private Coffee coffee;

    @Column(name = "QuantitySold")
    private int quantitySold;

    @Column(name = "SalePrice")
    private int salePrice;
}