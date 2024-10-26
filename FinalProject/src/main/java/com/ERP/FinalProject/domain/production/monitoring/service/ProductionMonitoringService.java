// ProductionMonitoringService.java
package com.ERP.FinalProject.domain.production.monitoring.service;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import com.ERP.FinalProject.domain.production.monitoring.repository.ProductionMonitoringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionMonitoringService {

    @Autowired
    private ProductionMonitoringRepository repository;

    public List<ProductionMonitoring> getAllMonitoringData() {
        return repository.findAll();
    }
}
