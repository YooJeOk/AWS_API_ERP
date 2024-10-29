package com.ERP.FinalProject.domain.inventory.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MaterialsInventoryDTO {

	private Long materialId;
	private String materialName;
	private String category;
	private String unit;
	private Integer unitPrice;
	private Integer quantityInStore;
	private LocalDateTime lastUpdated;
}
