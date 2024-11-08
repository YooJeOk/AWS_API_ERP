package com.ERP.FinalProject.domain.production.monitoring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import com.ERP.FinalProject.domain.production.monitoring.repository.ProductionMonitoringRepository;


@Service
public class ProductionMonitoringService {

    @Autowired
    private ProductionMonitoringRepository repository;

    @Autowired
    private ProductionMonitoringRepository productionMonitoringRepository;

    @Autowired
    private AligoSmsService aligoSmsService;

    private static final String RECEIVER_PHONE = "RECEIVER_PHONE_NUMBER";

    public double getLatestTemperature() {
        return productionMonitoringRepository.findLatestTemperature();
    }

    public void sendTemperatureAlert(double temperature) {
        String message = "⚠️ 공장 온도 경고: 현재 온도는 " + temperature + "°C로 임계값을 초과했습니다.";
        aligoSmsService.sendSms(RECEIVER_PHONE, message);
    }

  

    // 이전에 가져온 MonitorID 이후의 데이터를 오름차순으로 가져오는 메서드
    public ProductionMonitoring getNextData(int orderId, Long lastMonitorId) {
        Pageable pageable = PageRequest.of(0, 1, Sort.by("startTime").ascending());
        ProductionMonitoring monitoringData;
        
        if (lastMonitorId == null) {
            // 첫 번째 호출에서는 가장 오래된 데이터 하나를 반환
            monitoringData = repository.findFirstByOrderId(orderId, pageable)
                                       .getContent()
                                       .stream()
                                       .findFirst()
                                       .orElse(null);
        } else {
            // 이후 호출에서는 lastMonitorId 이후의 가장 오래된 데이터 하나를 반환
            monitoringData = repository.findFirstByOrderIdAndMonitorIdGreaterThan(orderId, lastMonitorId, pageable)
                                       .getContent()
                                       .stream()
                                       .findFirst()
                                       .orElse(null);
        }

        
        

        return monitoringData;
    }

   
}
