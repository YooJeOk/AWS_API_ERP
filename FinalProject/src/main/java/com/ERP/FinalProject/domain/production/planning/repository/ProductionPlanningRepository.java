package com.ERP.FinalProject.domain.production.planning.repository;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductionPlanningRepository extends JpaRepository<ProductionPlanning, Integer> {

    // 특정 OrderID로 계획 조회
    List<ProductionPlanning> findByOrderID(Integer orderID);

    // 특정 제품 ID로 계획 조회
    List<ProductionPlanning> findByProductID(Integer productID);

    // 필요시 날짜 범위에 따른 조회도 추가 가능
    List<ProductionPlanning> findByStartDateBetween(LocalDateTime start, LocalDateTime end);
}
