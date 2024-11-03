package com.ERP.FinalProject.domain.production.DefectManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ERP.FinalProject.domain.production.DefectManagement.entity.DefectManagement;
import com.ERP.FinalProject.domain.production.DefectManagement.service.DefectManagementService;

import java.util.List;

@RestController
public class DefectManagementController {

    @Autowired
    private DefectManagementService defectManagementService;

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
    
}

