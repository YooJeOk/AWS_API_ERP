package com.ERP.FinalProject.domain.inventory.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MBOM")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MBOM {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bomId;
    
    private Long itemId;
    private String itemType;
    private String size;
    private Long materialId;
    private String productName;
    private Integer quantity;
    private String unit;
    private Float unitPrice;
    private Integer totalCost;
}