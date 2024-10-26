// ProductionMonitoringRepository.java
package com.ERP.FinalProject.domain.production.monitoring.repository;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionMonitoringRepository extends JpaRepository<ProductionMonitoring, Integer> {
}
