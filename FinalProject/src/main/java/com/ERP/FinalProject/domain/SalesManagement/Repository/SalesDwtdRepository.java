package com.ERP.FinalProject.domain.SalesManagement.Repository;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface SalesDwtdRepository extends JpaRepository<SalesRecord, Integer> {

    // 요일별 매출 합계를 구하는 쿼리
    @Query("SELECT FUNCTION('DAYOFWEEK', sr.saleDate) AS dayOfWeek, SUM(sr.totalSalePrice) AS totalSales " +
           "FROM SalesManagementSalesRecord sr " +
           "GROUP BY FUNCTION('DAYOFWEEK', sr.saleDate) " +
           "ORDER BY dayOfWeek")
    List<Object[]> getSalesByDayOfWeek();
}
