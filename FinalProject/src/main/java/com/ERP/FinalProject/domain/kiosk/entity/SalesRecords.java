package com.ERP.FinalProject.domain.kiosk.entity;


import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "SalesRecords")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesRecords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long saleID;

    private LocalDateTime saleDate;

    private String paymentType;

    private int totalSalePrice;

    private int orderAmount;

    private int discountAmount;

}
