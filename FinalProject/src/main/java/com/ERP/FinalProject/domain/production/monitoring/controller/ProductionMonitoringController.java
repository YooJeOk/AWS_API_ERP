// ProductionMonitoringController.java
package com.ERP.FinalProject.domain.production.monitoring.controller;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import com.ERP.FinalProject.domain.production.monitoring.service.ProductionMonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/production-monitoring")
public class ProductionMonitoringController {

    @Autowired
    private ProductionMonitoringService service;

    @GetMapping
    public List<ProductionMonitoring> getAllMonitoringData() {
        return service.getAllMonitoringData();
    }
}
