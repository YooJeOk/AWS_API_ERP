package com.ERP.FinalProject.domain.production.monitoring.controller;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import com.ERP.FinalProject.domain.production.monitoring.service.ProductionMonitoringService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/production-monitoring")
public class ProductionMonitoringController {

    @Autowired
    private ProductionMonitoringService service;

    // 모든 모니터링 데이터 조회
    @GetMapping
    public List<ProductionMonitoring> getAllMonitoringData() {
        return service.getAllMonitoringData();
    }

    // 특정 OrderID에 따른 데이터 조회
    @GetMapping("/by-order")
    public List<ProductionMonitoring> getMonitoringDataByOrderId(@RequestParam Integer orderId) {
        return service.getMonitoringDataByOrderId(orderId);
    }

    // 특정 날짜에 따른 데이터 조회
    @GetMapping("/by-date")
    public List<ProductionMonitoring> getMonitoringDataByStartDate(@RequestParam String date) {
        return service.getMonitoringDataByStartDate(date);
    }
}
