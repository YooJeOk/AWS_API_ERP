package com.ERP.FinalProject.domain.production.monitoring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import com.ERP.FinalProject.domain.production.monitoring.service.ProductionMonitoringService;

@RestController
public class TemperatureMonitorController {

    @Autowired
    private ProductionMonitoringService productionMonitoringService;

    private static final double THRESHOLD_TEMPERATURE = 37.0;  // 예시 임계 온도

    @Scheduled(fixedRate = 10000)  // 10초마다 실행
    public void checkTemperature() {
        double currentTemperature = productionMonitoringService.getLatestTemperature();
        
        if (currentTemperature > THRESHOLD_TEMPERATURE) {
            productionMonitoringService.sendTemperatureAlert(currentTemperature);
        }
    }
}
