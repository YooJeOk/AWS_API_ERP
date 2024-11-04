package com.ERP.FinalProject.domain.SalesManagement.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesRecord;

import java.time.LocalDateTime;

public interface SalesStatusRepository extends JpaRepository<SalesRecord, Integer> {

    // 기간 내 총 판매 금액 합계
    @Query("SELECT SUM(sr.totalSalePrice) FROM SalesManagementSalesRecord sr WHERE sr.saleDate BETWEEN :startDate AND :endDate")
    Integer calculateTotalSales(LocalDateTime startDate, LocalDateTime endDate);

    // 기간 내 총 판매 건수(QuantitySold 합계)
    @Query("SELECT SUM(sd.quantitySold) FROM SalesManagementSalesDetail sd " +
           "JOIN sd.salesRecord sr " +
           "WHERE sr.saleDate BETWEEN :startDate AND :endDate")
    Long calculateTotalQuantitySold(LocalDateTime startDate, LocalDateTime endDate);
}
