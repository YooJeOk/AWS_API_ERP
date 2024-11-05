package com.ERP.FinalProject.domain.SalesManagement.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesRecord;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface SalesDwmRepository extends JpaRepository<SalesRecord, Integer> {

    // 일별 매출 데이터
    @Query("SELECT DATE(sr.saleDate) as date, SUM(sr.totalSalePrice) as totalSales " +
           "FROM SalesManagementSalesRecord sr " +
           "WHERE sr.saleDate BETWEEN :startDate AND :endDate " +
           "GROUP BY DATE(sr.saleDate) " +
           "ORDER BY DATE(sr.saleDate)")
    List<Map<String, Object>> findDailySales(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    // 주별 매출 데이터
    @Query("SELECT FUNCTION('YEARWEEK', sr.saleDate) as week, SUM(sr.totalSalePrice) as totalSales " +
           "FROM SalesManagementSalesRecord sr " +
           "WHERE sr.saleDate BETWEEN :startDate AND :endDate " +
           "GROUP BY FUNCTION('YEARWEEK', sr.saleDate) " +
           "ORDER BY FUNCTION('YEARWEEK', sr.saleDate)")
    List<Map<String, Object>> findWeeklySales(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    // 월별 매출 데이터
    @Query("SELECT FUNCTION('DATE_FORMAT', sr.saleDate, '%Y-%m') as month, SUM(sr.totalSalePrice) as totalSales " +
           "FROM SalesManagementSalesRecord sr " +
           "WHERE sr.saleDate BETWEEN :startDate AND :endDate " +
           "GROUP BY FUNCTION('DATE_FORMAT', sr.saleDate, '%Y-%m') " +
           "ORDER BY FUNCTION('DATE_FORMAT', sr.saleDate, '%Y-%m')")
    List<Map<String, Object>> findMonthlySales(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
