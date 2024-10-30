package com.ERP.FinalProject.domain.production.planning.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductionEntryDTO {

    private Integer orderId;
    private Integer productId;
    private Integer quantity;
    private LocalDateTime entryDate;
    private String etc;
}
