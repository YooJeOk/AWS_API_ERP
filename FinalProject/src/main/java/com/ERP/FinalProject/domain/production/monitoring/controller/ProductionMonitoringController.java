package com.ERP.FinalProject.domain.production.monitoring.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import com.ERP.FinalProject.domain.production.monitoring.service.ProductionMonitoringService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/production-monitoring")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductionMonitoringController {

    @Autowired
    private ProductionMonitoringService service;

    // 모든 모니터링 데이터 조회 ("/data" 경로 추가)
    @GetMapping("/data")
    public ResponseEntity<List<ProductionMonitoring>> getAllMonitoringData() {
        try {
            List<ProductionMonitoring> data = service.getAllMonitoringData();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 특정 OrderID에 따른 데이터 조회
    @GetMapping("/by-order")
    public ResponseEntity<List<ProductionMonitoring>> getMonitoringDataByOrderId(@RequestParam Integer orderId) {
        try {
            List<ProductionMonitoring> data = service.getMonitoringDataByOrderId(orderId);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 특정 날짜에 따른 데이터 조회
    @GetMapping("/by-date")
    public ResponseEntity<List<ProductionMonitoring>> getMonitoringDataByStartDate(@RequestParam String date) {
        try {
            List<ProductionMonitoring> data = service.getMonitoringDataByStartDate(date);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
