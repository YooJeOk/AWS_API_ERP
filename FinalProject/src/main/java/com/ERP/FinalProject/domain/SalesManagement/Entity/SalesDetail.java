package com.ERP.FinalProject.domain.SalesManagement.Entity;

import javax.persistence.*;

@Entity(name = "SalesManagementSalesDetail")
@Table(name = "salesdetails")
public class SalesDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long saleDetailId;

    @ManyToOne
    @JoinColumn(name = "saleId", nullable = false)
    private SalesRecord salesRecord;

    @ManyToOne
    @JoinColumn(name = "productId", insertable = false, updatable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "coffeeId", insertable = false, updatable = false)
    private Coffee coffee;

    private int quantitySold;
    private int salePrice;
}
