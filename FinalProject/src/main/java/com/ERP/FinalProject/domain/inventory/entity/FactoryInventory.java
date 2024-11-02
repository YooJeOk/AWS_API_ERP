package com.ERP.FinalProject.domain.inventory.entity;

import javax.persistence.*;

import com.ERP.FinalProject.domain.KioskManagement.entity.StoreInventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "FactoryInventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FactoryInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long factoryInventoryId;
    private Long productId;
    private Long materialId;
    private Integer quantityInFactory;
    private LocalDateTime factoryDate;

}