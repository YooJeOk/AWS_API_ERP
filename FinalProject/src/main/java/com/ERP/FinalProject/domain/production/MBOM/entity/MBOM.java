package com.ERP.FinalProject.domain.production.MBOM.entity;

import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "MBOM", schema = "ERP")
@Data
public class MBOM {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int BOMID;

    private int ItemID;
    
    @Enumerated(EnumType.STRING)
    private ItemType ItemType;
    
    @Enumerated(EnumType.STRING)
    private Size Size;
    
    private int MaterialID;
    
    private String ProductName;
    
    private int Quantity;
    
    private String Unit;
    
    private float UnitPrice;
    
    private int TotalCost;

    public enum ItemType {
        Product, Coffee
    }

    public enum Size {
        Regular, Extra
    }
}
