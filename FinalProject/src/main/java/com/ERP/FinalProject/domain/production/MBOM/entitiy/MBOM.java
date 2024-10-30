package com.ERP.FinalProject.domain.production.MBOM.entitiy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MBOM", schema = "ERP")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MBOM {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOMID")
    private Integer bomId;

    @Column(name = "ItemID", nullable = false)
    private Integer itemId;

    @Column(name = "ItemType", nullable = false)
    private String itemType;

    @Column(name = "Size")
    private String size;

    @Column(name = "MaterialID", nullable = false)
    private Integer materialId;

    @Column(name = "ProductName", nullable = false, length = 100)
    private String productName;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    @Column(name = "Unit")
    private String unit;

    @Column(name = "UnitPrice")
    private Float unitPrice;

    @Column(name = "TotalCost")
    private Float totalCost;
}
