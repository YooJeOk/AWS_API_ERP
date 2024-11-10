package com.ERP.FinalProject.domain.production.Entry.controller;

import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntry;
import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntryRequest;
import com.ERP.FinalProject.domain.production.Entry.service.ProductionEntryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProductionEntryController {
    private final ProductionEntryService productionEntryService;

    @Autowired
    public ProductionEntryController(ProductionEntryService productionEntryService) {
        this.productionEntryService = productionEntryService;
    }

    @PostMapping("/production-entry")
    public ResponseEntity<String> registerProductionEntry(@RequestBody ProductionEntryRequest request) {
        try {
            productionEntryService.registerProductionEntry(request);
            return ResponseEntity.ok("생산 입고가 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("등록 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
 // 모든 입고 관리 항목 조회
    @GetMapping("/production-entries")
    public ResponseEntity<List<ProductionEntry>> getAllProductionEntries() {
        List<ProductionEntry> entries = productionEntryService.getAllProductionEntries();
        return ResponseEntity.ok(entries);
    }
    // 입고 내역에 없는 QCID 목록을 반환하는 엔드포인트
    @GetMapping("/available-qcids")
    public ResponseEntity<List<Integer>> getAvailableQCIDs() {
        List<Integer> availableQcids = productionEntryService.getAvailableQCIDs();
        return ResponseEntity.ok(availableQcids);
    }
}

