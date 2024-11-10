package com.ERP.FinalProject.domain.production.DefectManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.production.DefectManagement.entity.DefectManagement;
import com.ERP.FinalProject.domain.production.DefectManagement.repository.DefectManagementRepository;
import com.ERP.FinalProject.domain.production.DefectManagement.service.DefectManagementService;
import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntry;
import com.ERP.FinalProject.domain.production.Entry.service.ProductionEntryService;

import java.util.List;
import java.util.Optional;

@RestController
public class DefectManagementController {

    @Autowired
    private DefectManagementService defectManagementService;

    @Autowired
    private ProductionEntryService productionEntryService;

    @Autowired
    private DefectManagementRepository defectManagementRepository;

    @GetMapping("/api/defects")
    public List<DefectManagement> getAllDefects() {
        return defectManagementService.getAllDefects();
    }

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

    @GetMapping("/api/defects/completed")
    public ResponseEntity<List<DefectManagement>> getCompletedDefects() {
        List<DefectManagement> completedDefects = defectManagementService.getCompletedDefects();
        return ResponseEntity.ok(completedDefects);
    }

    @GetMapping("/api/defects/{qcid}")
    public ResponseEntity<DefectManagement> getDefectByQCID(@PathVariable int qcid) {
        DefectManagement defect = defectManagementService.getDefectByQCID(qcid);
        if (defect != null) {
            return ResponseEntity.ok(defect);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/api/defects/complete/qcid/{qcid}")
    public ResponseEntity<String> updateStatusToCompleteByQCID(@PathVariable Integer qcid) {
        Optional<DefectManagement> defect = defectManagementRepository.findByQcid(qcid);
        if (defect.isPresent()) {
            DefectManagement defectManagement = defect.get();
            defectManagement.setStatus("완료");
            defectManagementRepository.save(defectManagement);
            return ResponseEntity.ok("QCID " + qcid + " 상태가 '완료'로 업데이트되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 QCID의 불량 항목을 찾을 수 없습니다.");
        }
    }
}
