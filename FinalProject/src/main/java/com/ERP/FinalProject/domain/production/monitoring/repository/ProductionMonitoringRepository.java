package com.ERP.FinalProject.domain.production.monitoring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;

public interface ProductionMonitoringRepository extends JpaRepository<ProductionMonitoring, Long> {

    // OrderID에 대한 가장 오래된 데이터를 가져오는 메서드
    Page<ProductionMonitoring> findFirstByOrderId(int orderId, Pageable pageable);

    // OrderID와 마지막 MonitorID 이후의 가장 오래된 데이터를 가져오는 메서드
    Page<ProductionMonitoring> findFirstByOrderIdAndMonitorIdGreaterThan(int orderId, Long lastMonitorId, Pageable pageable);
}
