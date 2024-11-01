package com.ERP.FinalProject.domain.production.MBOM.entity;

import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "MBOM", schema = "ERP")
@Data
public class MBOM {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bomId;  // 필드 이름을 소문자로 변경

    private int itemId;
    
    @Enumerated(EnumType.STRING)
    private ItemType itemType;
    
    @Enumerated(EnumType.STRING)
    private Size size;
    
    private int materialId;  // materialId로 변경하여 쿼리와 일관성 유지
    
    private String productName;
    
    private int quantity;
    
    private String unit;
    
    private float unitPrice;
    
    private int totalCost;

    public enum ItemType {
        Product, Coffee
    }

    public enum Size {
        Regular, Extra
    }
}
