// ProductionPlanningController.java 전체 코드
package com.ERP.FinalProject.domain.production.planning.controller;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import com.ERP.FinalProject.domain.production.planning.service.ProductionPlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/production-planning")
public class ProductionPlanningController {

    private final ProductionPlanningService productionPlanningService;

    @Autowired
    public ProductionPlanningController(ProductionPlanningService productionPlanningService) {
        this.productionPlanningService = productionPlanningService;
    }

    @GetMapping
    public List<ProductionPlanning> getAllProductionPlans() {
        return productionPlanningService.getAllProductionPlans();
    }

    @GetMapping("/{planId}")
    public ProductionPlanning getProductionPlanById(@PathVariable int planId) {
        return productionPlanningService.getProductionPlanById(planId);
    }

    @PostMapping("/create")
    public ProductionPlanning createProductionPlan(@RequestBody ProductionPlanning productionPlan) {
        return productionPlanningService.saveProductionPlan(productionPlan);
    }

    @DeleteMapping("/{planId}")
    public void deleteProductionPlan(@PathVariable int planId) {
        productionPlanningService.deleteProductionPlanById(planId);
    }
}
