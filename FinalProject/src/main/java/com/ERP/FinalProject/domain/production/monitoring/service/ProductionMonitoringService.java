package com.ERP.FinalProject.domain.production.monitoring.service;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoring;
import com.ERP.FinalProject.domain.production.monitoring.repository.ProductionMonitoringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductionMonitoringService {

    @Autowired
    private ProductionMonitoringRepository repository;

    private Integer lastSentOrderId = null;
    private boolean completed = false;

    public Optional<ProductionMonitoring> getNextMonitoringData() {
        if (completed) {
            return Optional.empty();
        }

        PageRequest pageRequest = PageRequest.of(0, 1, Sort.by("orderId").ascending());
        List<ProductionMonitoring> batchData;

        if (lastSentOrderId == null) {
            batchData = repository.findAll(pageRequest).getContent();
        } else {
            batchData = repository.findByOrderIdGreaterThan(lastSentOrderId, pageRequest);
        }

        if (batchData.isEmpty()) {
            completed = true;
            return Optional.empty();
        } else {
            lastSentOrderId = batchData.get(0).getOrderId();
            return Optional.of(batchData.get(0));
        }
    }
}
