package com.ERP.FinalProject.domain.KioskManagement.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ERP.FinalProject.domain.inventory.entity.MaterialsInventory;
import com.ERP.FinalProject.domain.inventory.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "StoreInventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreInventory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long storeInventoryId;
	private Long productId;
	private Long materialId;
	private Integer quantityInStore;
	private LocalDateTime storeDate;
}