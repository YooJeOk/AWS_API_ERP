package com.ERP.FinalProject.domain.production.monitoring.repository;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductionMonitoringRepository extends JpaRepository<ProductionMonitoring, Long> {
    
    // 특정 OrderID에 따른 데이터를 조회하는 메서드
    List<ProductionMonitoring> findByOrderId(Integer orderId);

    // 특정 날짜 또는 시간 조건에 따라 데이터를 조회하는 메서드 예시
    List<ProductionMonitoring> findByStartTimeContaining(String date);

    // 필요에 따라 다양한 조건 추가 가능
}
