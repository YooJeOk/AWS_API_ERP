package com.ERP.FinalProject.domain.production.planning.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "productionentry", schema = "ERP")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductionEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EntryID")
    private Integer entryId;

    @Column(name = "OrderID", nullable = false)
    private Integer orderId;

    @Column(name = "ProductID", nullable = false)
    private Integer productId;

    @Column(name = "Quantity")
    private Integer quantity;

    @Column(name = "EntryDate")
    private LocalDateTime entryDate;

    @Column(name = "etc")
    private String etc;
}
