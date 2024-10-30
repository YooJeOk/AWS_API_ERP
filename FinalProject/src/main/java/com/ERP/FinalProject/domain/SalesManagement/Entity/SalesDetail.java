package com.ERP.FinalProject.domain.SalesManagement.Entity;

import java.util.List;
import javax.persistence.*;

import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.kiosk.entity.Coffee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "SalesManagementSalesDetail")
@Table(name = "SalesDetails", schema = "ERP")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long saleDetailID;

    @ManyToOne(fetch = FetchType.LAZY) // 지연 로딩
    @JoinColumn(name = "saleID", nullable = false)
    private SalesRecord salesRecord;

    @ManyToOne(fetch = FetchType.EAGER) // 즉시 로딩
    @JoinColumn(name = "productID", referencedColumnName = "productID")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER) // 즉시 로딩
    @JoinColumn(name = "coffeeID", referencedColumnName = "coffeeID")
    private Coffee coffee;

    private Integer quantitySold;
    private Integer salePrice;
}

