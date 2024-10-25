package com.ERP.FinalProject.domain.production.monitoring.controller;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoringData;
import com.ERP.FinalProject.domain.production.monitoring.service.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/production-monitoring")
public class ProductionController {

    @Autowired
    private CsvService csvService;

    // CSV 데이터를 제공하는 API
    @GetMapping
    public List<ProductionMonitoringData> getProductionMonitoringData() {
        return csvService.readCSV();  // CsvService에서 CSV 파일 읽어오기
    }
}
