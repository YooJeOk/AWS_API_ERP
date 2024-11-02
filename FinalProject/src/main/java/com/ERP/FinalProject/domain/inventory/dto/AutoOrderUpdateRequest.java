package com.ERP.FinalProject.domain.inventory.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AutoOrderUpdateRequest {
    private Long itemId;
    private String category;
    private String autoOrder;
    private Integer autoOrderQuantity;

}