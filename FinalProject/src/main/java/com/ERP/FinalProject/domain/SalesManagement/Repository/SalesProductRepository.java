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
    @Query("SELECT " +
           "CASE WHEN sd.product.productName IS NOT NULL THEN sd.product.productName ELSE sd.coffee.coffeeName END AS name, " +
           "SUM(sd.quantitySold) AS sales, " +
           "sr.saleDate AS date " +
           "FROM SalesManagementSalesDetail sd " +
           "JOIN sd.salesRecord sr " +
           "WHERE sr.saleDate BETWEEN :startDate AND :endDate " +
           "GROUP BY name, sr.saleDate " +
           "ORDER BY sr.saleDate")
    List<Object[]> findSalesByProductAndDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
