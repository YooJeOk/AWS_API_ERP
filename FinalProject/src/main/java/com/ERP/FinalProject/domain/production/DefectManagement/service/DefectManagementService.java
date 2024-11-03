package com.ERP.FinalProject.domain.production.DefectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.production.DefectManagement.entity.DefectManagement;
import com.ERP.FinalProject.domain.production.DefectManagement.repository.DefectManagementRepository;

import java.util.List;

@Service
public class DefectManagementService {

    @Autowired
    private DefectManagementRepository defectManagementRepository;

    // 모든 불량 항목 조회
    public List<DefectManagement> getAllDefects() {
        return defectManagementRepository.findAll();
    }

    // 특정 상태의 불량 항목 조회
    public List<DefectManagement> getDefectsByStatus(String status) {
        return defectManagementRepository.findByStatus(status);
    }
    
    public DefectManagement updateDefectStatus(int defectId, DefectManagement defectDetails) {
        DefectManagement defect = defectManagementRepository.findById(defectId)
                .orElseThrow(() -> new RuntimeException("Defect not found"));
        
        defect.setStatus(defectDetails.getStatus()); // 상태 업데이트
        return defectManagementRepository.save(defect);
    }
    
}
