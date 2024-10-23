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

    @Column(nullable = false)
    private LocalDateTime saleDate;

    @Column(nullable = false)
    private String paymentType;

    @Column(nullable = false)
    private int totalSalePrice;

}