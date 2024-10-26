package com.ERP.FinalProject.domain.production.planning.service;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import com.ERP.FinalProject.domain.production.planning.repository.ProductionPlanningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductionPlanningService {

    @Autowired
    private ProductionPlanningRepository repository;

    public List<ProductionPlanning> getAllPlanningData() {
        List<ProductionPlanning> plans = repository.findAll();
        plans.forEach(this::applyCalculations);
        return plans;
    }

    public List<ProductionPlanning> getPlanningDataByOrderId(Integer orderId) {
        List<ProductionPlanning> plans = repository.findByOrderID(orderId);
        plans.forEach(this::applyCalculations);
        return plans;
    }

    public List<ProductionPlanning> getPlanningDataByProductId(Integer productId) {
        List<ProductionPlanning> plans = repository.findByProductID(productId);
        plans.forEach(this::applyCalculations);
        return plans;
    }

    public List<ProductionPlanning> getPlanningDataByStartDateRange(LocalDateTime start, LocalDateTime end) {
        List<ProductionPlanning> plans = repository.findByStartDateBetween(start, end);
        plans.forEach(this::applyCalculations);
        return plans;
    }

    private void applyCalculations(ProductionPlanning plan) {
        plan.setProductionCalculation(calculateProduction(plan));
        plan.setMrpCalculation(calculateMRP(plan));
    }

    private int calculateProduction(ProductionPlanning plan) {
        return plan.getOrderID() * 2; // 예시 계산식
    }

    private int calculateMRP(ProductionPlanning plan) {
        return plan.getOrderID() * 3; // 예시 계산식
    }
}
