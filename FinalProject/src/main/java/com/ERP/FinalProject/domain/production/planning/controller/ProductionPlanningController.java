package com.ERP.FinalProject.domain.production.planning.controller;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import com.ERP.FinalProject.domain.production.planning.service.ProductionPlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/production-planning")
public class ProductionPlanningController {

    @Autowired
    private ProductionPlanningService service;

    @GetMapping
    public List<ProductionPlanning> getAllPlanningData() {
        return service.getAllPlanningData();
    }

    @GetMapping("/by-order")
    public List<ProductionPlanning> getPlanningDataByOrderId(@RequestParam Integer orderId) {
        return service.getPlanningDataByOrderId(orderId);
    }

    @GetMapping("/by-product")
    public List<ProductionPlanning> getPlanningDataByProductId(@RequestParam Integer productId) {
        return service.getPlanningDataByProductId(productId);
    }

    @GetMapping("/by-date-range")
    public List<ProductionPlanning> getPlanningDataByDateRange(
            @RequestParam String start,
            @RequestParam String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        return service.getPlanningDataByStartDateRange(startDate, endDate);
    }
}
