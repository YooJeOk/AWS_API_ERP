package com.ERP.FinalProject.domain.production.MBOM.entity;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM.ItemType;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM.Size;
import lombok.Data;

@Data
public class MBOMDTO {

    private int BOMID;
    private int ItemID;
    private ItemType itemType;
    private Size size;
    private int materialID;
    private String materialName;
    private String productName;
    private int quantity;
    private String unit;
    private float unitPrice;
    private int totalCost;

    // 생성자
    public MBOMDTO(int BOMID, int ItemID, ItemType itemType, Size size, int materialID, 
                   String materialName, String productName, int quantity, 
                   String unit, float unitPrice, int totalCost) {
        this.BOMID = BOMID;
        this.ItemID = ItemID;
        this.itemType = itemType;
        this.size = size;
        this.materialID = materialID;
        this.materialName = materialName;
        this.productName = productName;
        this.quantity = quantity;
        this.unit = unit;
        this.unitPrice = unitPrice;
        this.totalCost = totalCost;
    }
}
