package com.ERP.FinalProject.domain.inventory.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "OrderHistory")

public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private String category;
    private String productName;
    private int quantity;
    private String unit;
    private String orderType;
    private String orderStatus;
    private LocalDateTime orderDate;
    private LocalDateTime completedDate;
    
    @Column(name = "ProductID")
    private Long productId;

    @Column(name = "MaterialID")
    private Long materialId;
    
}
