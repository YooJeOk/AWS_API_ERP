package com.ERP.FinalProject.domain.production.MBOM.entity;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM.ItemType;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MBOMDTO {

    private int BOMID;
    private Long ItemID;
    private ItemType itemType;
    private Size size;
    private Long MaterialID;
    private String materialName;
    private String productName;
    private int quantity;
    private String unit;
    private float unitPrice;
    private int totalCost;

    // 생성자
    public MBOMDTO(int BOMID, Long ItemID, ItemType itemType, Size size, Long MaterialID, 
                   String materialName, String productName, int quantity, 
                   String unit, float unitPrice, int totalCost) {
        this.BOMID = BOMID;
        this.ItemID = ItemID;
        this.itemType = itemType;
        this.size = size;
        this.MaterialID = MaterialID;
        this.materialName = materialName;
        this.productName = productName;
        this.quantity = quantity;
        this.unit = unit;
        this.unitPrice = unitPrice;
        this.totalCost = totalCost;
    }
}
