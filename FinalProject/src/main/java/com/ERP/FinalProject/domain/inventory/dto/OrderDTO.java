package com.ERP.FinalProject.domain.inventory.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
	private String category;
    private String productName;
    private int quantity;
    private String unit;
    private Long productId;
    private Long materialId;
}
