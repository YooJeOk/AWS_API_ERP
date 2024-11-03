// ProductionEntryController.java
package com.ERP.FinalProject.domain.production.Entry.controller;

import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntryRequest;
import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntry;
import com.ERP.FinalProject.domain.production.Entry.service.ProductionEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Collections;

@RestController
@RequestMapping("/api/production-entry")
public class ProductionEntryController {

    private final ProductionEntryService productionEntryService;

    @Autowired
    public ProductionEntryController(ProductionEntryService productionEntryService) {
        this.productionEntryService = productionEntryService;
    }

    @PostMapping
    public ResponseEntity<String> registerProductionEntry(@RequestBody ProductionEntryRequest request) {
        try {
            productionEntryService.registerProductionEntry(request);
            return ResponseEntity.ok("생산 입고가 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("등록 중 오류가 발생했습니다.");
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductionEntry>> getProductionEntries() {
        try {
            List<ProductionEntry> entries = productionEntryService.getAllEntries();
            return ResponseEntity.ok(entries);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }
}
