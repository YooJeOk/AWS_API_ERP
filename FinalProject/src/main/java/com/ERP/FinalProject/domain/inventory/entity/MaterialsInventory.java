package com.ERP.FinalProject.domain.inventory.entity;

import java.time.LocalDateTime;
import java.util.List;

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

@Entity
@Table(name = "MaterialsInventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialsInventory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long materialId;
	private String materialName;
	private String category;
	private String unit;
	private Double unitPrice;
	private LocalDateTime lastUpdated;

}