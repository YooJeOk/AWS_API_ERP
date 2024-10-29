package com.ERP.FinalProject.domain.inventory.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
	private Long productId;
	private String productName;
	private String productCategory;
	private Integer unitPrice;
	private Integer salePrice;
	private Integer quantityInStore;
	private LocalDateTime productionDate;
	private String recommend;
	private String detailDescription;

}
