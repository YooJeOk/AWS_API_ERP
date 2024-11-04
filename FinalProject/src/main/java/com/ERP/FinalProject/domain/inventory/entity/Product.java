package com.ERP.FinalProject.domain.inventory.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.ERP.FinalProject.domain.KioskManagement.entity.StoreInventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Product")
public class Product {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private String productName;
    private String productCategory;
    private Integer unitPrice;
    private Integer salePrice;
    private LocalDateTime productionDate;
    private String productImage;
    private String onKiosk;
    private String recommend;
    private String detailDescription;
    private Integer minimumStock;
}
