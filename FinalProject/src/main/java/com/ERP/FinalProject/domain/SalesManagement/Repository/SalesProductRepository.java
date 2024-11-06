package com.ERP.FinalProject.domain.SalesManagement.Repository;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SalesProductRepository extends JpaRepository<SalesDetails, Integer> {

    @Query("SELECT COALESCE(p.productName, c.coffeeName) as name, SUM(d.quantitySold) as sales " +
           "FROM SalesManagementSalesDetail d " +
           "JOIN d.salesRecord r " +
           "LEFT JOIN d.product p " +
           "LEFT JOIN d.coffee c " +
           "WHERE r.saleDate BETWEEN :startDate AND :endDate " +
           "GROUP BY COALESCE(p.productName, c.coffeeName) " +
           "ORDER BY sales DESC")
    List<Object[]> findSalesByProductAndDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}