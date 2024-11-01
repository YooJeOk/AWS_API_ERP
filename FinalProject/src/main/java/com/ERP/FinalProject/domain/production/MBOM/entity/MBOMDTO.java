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
    private int supplierId;
    private String supplierName;
    private String category; // 새로운 category 필드 추가

    // 생성자
    public MBOMDTO(int BOMID, int ItemID, ItemType itemType, Size size, int materialID, 
                   String materialName, String productName, int quantity, String unit, 
                   float unitPrice, int totalCost, int supplierId, String supplierName, String category) {
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
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.category = category; // 필드 초기화
    }
}
