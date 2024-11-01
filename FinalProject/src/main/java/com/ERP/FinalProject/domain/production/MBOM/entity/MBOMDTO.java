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
    private int materialID;  // 추가 필드
    private String productName;
    private int quantity;
    private String unit;
    private float unitPrice;
    private int totalCost;

    // materialID 포함된 생성자
    public MBOMDTO(int BOMID, int ItemID, ItemType itemType, Size size, int materialID, 
                   String productName, int quantity, String unit, float unitPrice, int totalCost) {
        this.BOMID = BOMID;
        this.ItemID = ItemID;
        this.itemType = itemType;
        this.size = size;
        this.materialID = materialID;
        this.productName = productName;
        this.quantity = quantity;
        this.unit = unit;
        this.unitPrice = unitPrice;
        this.totalCost = totalCost;
    }

    // materialID 제외된 생성자 (필요한 생성자)
    public MBOMDTO(int BOMID, int ItemID, ItemType itemType, Size size, 
                   String productName, int quantity, String unit, float unitPrice, int totalCost) {
        this.BOMID = BOMID;
        this.ItemID = ItemID;
        this.itemType = itemType;
        this.size = size;
        this.productName = productName;
        this.quantity = quantity;
        this.unit = unit;
        this.unitPrice = unitPrice;
        this.totalCost = totalCost;
    }
}
