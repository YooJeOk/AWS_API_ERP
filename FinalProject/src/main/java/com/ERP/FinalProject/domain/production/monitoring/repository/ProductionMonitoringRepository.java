package com.ERP.FinalProject.domain.production.monitoring.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoringData;

@Repository
public interface ProductionMonitoringRepository extends JpaRepository<ProductionMonitoringData, Long> {
}

