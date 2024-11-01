// ProductionPlanningService.java 전체 코드
package com.ERP.FinalProject.domain.production.planning.service;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import com.ERP.FinalProject.domain.production.planning.repository.ProductionPlanningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionPlanningService {

    private final ProductionPlanningRepository productionPlanningRepository;

    @Autowired
    public ProductionPlanningService(ProductionPlanningRepository productionPlanningRepository) {
        this.productionPlanningRepository = productionPlanningRepository;
    }

    public List<ProductionPlanning> getAllProductionPlans() {
        return productionPlanningRepository.findAll();
    }

    public ProductionPlanning getProductionPlanById(int planId) {
        return productionPlanningRepository.findById(planId).orElse(null);
    }

    public ProductionPlanning saveProductionPlan(ProductionPlanning productionPlan) {
        return productionPlanningRepository.save(productionPlan);
    }

    public void deleteProductionPlanById(int planId) {
        productionPlanningRepository.deleteById(planId);
    }
}
