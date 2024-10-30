package com.ERP.FinalProject.domain.production.planning.controller;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanningDTO;
import com.ERP.FinalProject.domain.production.planning.service.ProductionPlanningService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/production-planning")
@CrossOrigin(origins = "http://localhost:8080") // 서버의 8080번 포트로 설정

public class ProductionPlanningController {

    private final ProductionPlanningService productionPlanningService;

    public ProductionPlanningController(ProductionPlanningService productionPlanningService) {
        this.productionPlanningService = productionPlanningService;
    }

    
  
    
    // 기본 Production Planning DTO를 조회
    @GetMapping("/basic")
    public List<ProductionPlanningDTO> getBasicProductionPlanning() {
        return productionPlanningService.getBasicProductionPlanning();
    }

    @PostMapping("/create")
    public boolean createProductionPlanning(@RequestBody List<ProductionPlanning> productionPlanningList) {
        return productionPlanningService.saveAllProductionPlanning(productionPlanningList);
    }



}
