package com.ERP.FinalProject.domain.production;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionMonitoringRepository extends JpaRepository<ProductionMonitoring, Long> {
}

