package com.ERP.FinalProject.domain.production.DefectManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.production.DefectManagement.entity.DefectManagement;
import com.ERP.FinalProject.domain.production.DefectManagement.service.DefectManagementService;
import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntry;
import com.ERP.FinalProject.domain.production.Entry.service.ProductionEntryService;

import java.util.List;
import java.util.Date;

@RestController
public class DefectManagementController {

    @Autowired
    private DefectManagementService defectManagementService;

    @Autowired
    private ProductionEntryService productionEntryService;

    // 모든 불량 항목 조회
    @GetMapping("/api/defects")
    public List<DefectManagement> getAllDefects() {
        return defectManagementService.getAllDefects();
    }

    // 특정 상태의 불량 항목 조회 (예: 미처리)
    @GetMapping("/api/defects/status")
    public List<DefectManagement> getDefectsByStatus(@RequestParam String status) {
        return defectManagementService.getDefectsByStatus(status);
    }
    
    @PutMapping("/api/defects/{defectId}")
    public ResponseEntity<DefectManagement> updateDefectStatus(
            @PathVariable int defectId, 
            @RequestBody DefectManagement defectDetails) {
        DefectManagement updatedDefect = defectManagementService.updateDefectStatus(defectId, defectDetails);
        return ResponseEntity.ok(updatedDefect);
    }

    // 완료된 품질 검사 ID만 가져오는 엔드포인트
    @GetMapping("/api/defects/completed")
    public ResponseEntity<List<DefectManagement>> getCompletedDefects() {
        List<DefectManagement> completedDefects = defectManagementService.getCompletedDefects();
        return ResponseEntity.ok(completedDefects);
    }

    // 특정 품질 검사 ID를 통해 불량 데이터 조회
    @GetMapping("/api/defects/{qcid}")
    public ResponseEntity<DefectManagement> getDefectByQCID(@PathVariable int qcid) {
        DefectManagement defect = defectManagementService.getDefectByQCID(qcid);
        if (defect != null) {
            return ResponseEntity.ok(defect);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
