package com.ERP.FinalProject.domain.production.monitoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ERP.FinalProject.domain.production.monitoring.model.ProductionProcessStatus;

public interface ProcessStatusRepository extends JpaRepository<ProductionProcessStatus, Long> {
}
