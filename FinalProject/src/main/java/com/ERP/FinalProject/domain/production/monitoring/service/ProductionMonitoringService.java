package com.ERP.FinalProject.domain.production.monitoring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import com.ERP.FinalProject.domain.production.monitoring.repository.ProductionMonitoringRepository;
import com.ERP.FinalProject.domain.production.monitoring.alert.ProductionMonitoringAlertService;

@Service
public class ProductionMonitoringService {

    @Autowired
    private ProductionMonitoringRepository repository;

    @Autowired
    private ProductionMonitoringAlertService alertService;

    private static final float MIN_TEMP = 0f;  // 최소 허용 온도
    private static final float MAX_TEMP = 38.0f;  // 최대 허용 온도

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

        // 데이터가 존재하고, 온도 범위를 벗어났을 경우 알림 전송
        if (monitoringData != null) {
            checkTemperatureAndAlert(monitoringData);
        }

        return monitoringData;
    }

    // 온도 범위를 벗어났는지 확인하고 알림을 보내는 메서드
    private void checkTemperatureAndAlert(ProductionMonitoring monitoringData) {
        float temperature = monitoringData.getTemperature();

        // 온도가 범위를 벗어나면 알림을 보냄
        if (temperature < MIN_TEMP || temperature > MAX_TEMP) {
            String alertMessage = String.format("온도 범위를 벗어났습니다! 현재 온도: %.1f도", temperature);
            alertService.sendAlert(alertMessage);
        }
    }
}
