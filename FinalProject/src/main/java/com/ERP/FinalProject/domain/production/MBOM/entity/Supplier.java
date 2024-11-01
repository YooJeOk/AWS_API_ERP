package com.ERP.FinalProject.domain.production.MBOM.entity;

import javax.persistence.*;

import com.ERP.FinalProject.domain.inventory.entity.MaterialsInventory;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Suppliers", schema = "ERP")
@Data
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int supplierId;  // SupplierID 필드

    private String supplierName;  // 공급업체명
    private String contactInfo;   // 연락처 정보
    private String address;       // 주소
    private String supplierType;  // 공급업체 유형
    private LocalDateTime registrationDate;  // 등록 날짜

    @OneToMany(mappedBy = "supplier")
    private List<MaterialsInventory> materials;

    // Constructors, getters, setters
}
