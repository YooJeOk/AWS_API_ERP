package com.ERP.FinalProject.domain.production.monitoring.service;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import com.ERP.FinalProject.domain.production.monitoring.repository.ProductionMonitoringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductionMonitoringService {

   
    @Autowired
    private ProductionMonitoringRepository repository;

   
 

    /**
     * 이전에 가져온 MonitorID 이후의 데이터를 오름차순으로 가져오는 메서드입니다.
     */
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
