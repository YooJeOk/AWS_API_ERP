package com.ERP.FinalProject.domain.SalesManagement.Entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "SalesManagementSalesRecord")
@Table(name = "salesrecords")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SaleID")
    private int saleID;

    @Column(name = "SaleDate")
    private LocalDateTime saleDate;

    @Column(name = "PaymentType")
    private String paymentType;

    @Column(name = "TotalSalePrice")
    private int totalSalePrice;

    @Column(name = "OrderAmount")
    private int orderAmount;

    @Column(name = "DiscountAmount")
    private int discountAmount;

    // 일대다 관계 설정
    @OneToMany(mappedBy = "salesRecord", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("salesRecord") // 순환 참조 방지
    private List<SalesDetails> salesDetails;
}