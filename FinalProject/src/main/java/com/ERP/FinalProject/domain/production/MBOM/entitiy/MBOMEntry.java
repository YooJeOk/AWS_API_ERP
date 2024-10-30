package com.ERP.FinalProject.domain.production.MBOM.entitiy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MBOMEntry {
    private Integer itemId;
    private String itemType;
    private String size;
    private Integer materialId;
    private String productName;
    private Integer quantity;
    private String unit;
    private Float unitPrice;
    private Float totalCost;
}
