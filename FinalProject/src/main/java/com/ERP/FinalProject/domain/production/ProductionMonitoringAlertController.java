package com.ERP.FinalProject.domain.production;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/production")
public class ProductionMonitoringAlertController {

    @Autowired
    private ProductionMonitoringAlertService alertService;

    // 경고 체크 API
    @GetMapping("/alerts")
    public String checkAlerts() {
        return alertService.checkForAlerts();  // 경고 메시지를 반환
    }
}
