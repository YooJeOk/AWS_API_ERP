package com.ERP.FinalProject.domain.production.monitoring.repository;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import java.util.List;

public interface ProductionMonitoringRepository extends PagingAndSortingRepository<ProductionMonitoring, Integer> {
    
    
    List<ProductionMonitoring> findByOrderIdGreaterThan(Integer orderId, Pageable pageable);
}
