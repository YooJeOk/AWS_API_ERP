package com.ERP.FinalProject.domain.production.monitoring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import com.ERP.FinalProject.domain.production.monitoring.service.ProductionMonitoringService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/monitoring")
public class ProductionMonitoringController {

    @Autowired
    private ProductionMonitoringService service;

    private Map<Integer, Long> lastMonitorIdMap = new HashMap<>(); // OrderID별로 마지막 MonitorID를 저장하는 맵

    @GetMapping("/data/{orderId}")
    public ProductionMonitoring getNextData(@PathVariable int orderId) {
        Long lastMonitorId = lastMonitorIdMap.get(orderId); // 해당 OrderID의 마지막 MonitorID를 가져옴
        ProductionMonitoring data = service.getNextData(orderId, lastMonitorId);
        
        if (data != null) {
            lastMonitorIdMap.put(orderId, data.getMonitorId()); // 새로운 MonitorID로 업데이트
        }
        return data;
    }
}
