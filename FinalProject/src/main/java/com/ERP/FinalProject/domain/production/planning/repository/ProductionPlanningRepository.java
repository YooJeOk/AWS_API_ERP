// ProductionPlanningRepository.java 전체 코드
package com.ERP.FinalProject.domain.production.planning.repository;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductionPlanningRepository extends JpaRepository<ProductionPlanning, Integer> {

    @Query("SELECT p.orderId FROM ProductionPlanning p")
    List<Integer> findAllOrderIds();
}
