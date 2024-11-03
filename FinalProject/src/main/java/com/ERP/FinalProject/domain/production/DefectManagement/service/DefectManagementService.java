package com.ERP.FinalProject.domain.production.DefectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.production.DefectManagement.entity.DefectManagement;
import com.ERP.FinalProject.domain.production.DefectManagement.repository.DefectManagementRepository;

import java.util.List;
import java.util.Optional;

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

    // 특정 불량 항목의 상태 업데이트
    public DefectManagement updateDefectStatus(int defectId, DefectManagement defectDetails) {
        DefectManagement defect = defectManagementRepository.findById(defectId)
                .orElseThrow(() -> new RuntimeException("Defect not found"));

        defect.setStatus(defectDetails.getStatus());
        return defectManagementRepository.save(defect);
    }

    // 특정 불량 항목을 완료 처리하는 메서드
    public DefectManagement completeDefectCheck(int defectId) {
        Optional<DefectManagement> defectOpt = defectManagementRepository.findById(defectId);

        if (defectOpt.isPresent()) {
            DefectManagement defect = defectOpt.get();
            defect.setStatus("완료");
            return defectManagementRepository.save(defect);
        } else {
            throw new RuntimeException("Defect not found with ID: " + defectId);
        }
    }

    // 특정 QCID로 불량 항목을 조회하는 메서드
    public DefectManagement getDefectByQCID(int qcid) {
        return defectManagementRepository.findByQcid(qcid).orElse(null);
    }

    // 완료된 불량 항목 조회
    public List<DefectManagement> getCompletedDefects() {
        return defectManagementRepository.findByStatus("완료");
    }

    
    // QCID를 기반으로 불량 수량 조회
    public int getDefectQuantityByQCID(String qcid) {
        return defectManagementRepository.findDefectQuantityByQCID(qcid).orElse(0);
    }
}
