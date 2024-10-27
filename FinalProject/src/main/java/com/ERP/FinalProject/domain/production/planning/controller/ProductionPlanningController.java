package com.ERP.FinalProject.domain.production.planning.controller;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanningDTO;
import com.ERP.FinalProject.domain.production.planning.service.ProductionPlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/production-planning")
public class ProductionPlanningController {

    private final ProductionPlanningService service;

    // 생성자를 통한 의존성 주입
    @Autowired
    public ProductionPlanningController(ProductionPlanningService service) {
        this.service = service;
    }

    // 특정 ProductID로 가공된 생산 계획 및 MRP 계산 데이터를 반환
    @GetMapping("/data-by-product")
    public ResponseEntity<List<ProductionPlanningDTO>> getProcessedPlanningDataByProductId(@RequestParam Integer productId) {
        List<ProductionPlanningDTO> result = service.getProcessedPlanningDataByProductId(productId);
        
        if (result.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
