package com.ERP.FinalProject.domain.inventory.entity;

import java.time.LocalDateTime;
import javax.persistence.*;

import com.ERP.FinalProject.domain.production.MBOM.entity.Supplier; // Supplier 엔티티를 import

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MaterialsInventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialsInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;

    @ManyToOne
    @JoinColumn(name = "SupplierID")  // Supplier 테이블의 SupplierID 컬럼을 외래 키로 설정
    private Supplier supplier;        // Supplier와의 관계 설정

    private String materialName;
    private String category;
    private String unit;
    private Double unitPrice;
    private LocalDateTime lastUpdated;
    private int minimumStock;
    private String autoOrder;
    private Integer autoOrderQauntity;

}
