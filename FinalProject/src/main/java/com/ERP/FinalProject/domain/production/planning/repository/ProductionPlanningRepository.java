package com.ERP.FinalProject.domain.production.planning.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface ProductionPlanningRepository extends JpaRepository<ProductionPlanning, Integer> {

    // 특정 ProductID로 계획된 수량, 원가, 필요 원재료량 등을 가져오는 쿼리
	@Query(value = "SELECT p.OrderID, p.ProductID, p.StartDate, p.EndDate, w.Quantity AS plannedQuantity, " +
            "m.MaterialID, i.MaterialName, SUM(m.Quantity * w.Quantity) AS requiredMaterialQty, " +
            "SUM(m.UnitPrice * m.Quantity * w.Quantity) AS materialCost, SUM(m.TotalCost * w.Quantity) AS totalMrpCost, " +
            "p.etc " +
            "FROM ERP.ProductionPlanning p " +
            "JOIN ERP.WorkOrders w ON p.OrderID = w.OrderID AND p.ProductID = w.ProductID " +
            "JOIN ERP.MBOM m ON p.ProductID = m.ItemID AND m.ItemType = 'Product' " +
            "JOIN ERP.MaterialsInventory i ON m.MaterialID = i.MaterialID " +
            "WHERE p.ProductID = :productId " +
            "GROUP BY p.OrderID, p.ProductID, p.StartDate, p.EndDate, w.Quantity, m.MaterialID, i.MaterialName, p.etc", 
    nativeQuery = true)
List<Object[]> findProductionAndMrpDataByProductId(@Param("productId") Integer productId);

}
