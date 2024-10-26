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

    // 모든 모니터링 데이터 조회
    public List<ProductionMonitoring> getAllMonitoringData() {
        return repository.findAll();
    }

    // 특정 OrderID에 따른 모니터링 데이터 조회
    public List<ProductionMonitoring> getMonitoringDataByOrderId(Integer orderId) {
        return repository.findByOrderId(orderId);
    }

    // 특정 날짜에 따른 모니터링 데이터 조회
    public List<ProductionMonitoring> getMonitoringDataByStartDate(String date) {
        return repository.findByStartTimeContaining(date);
    }
}
