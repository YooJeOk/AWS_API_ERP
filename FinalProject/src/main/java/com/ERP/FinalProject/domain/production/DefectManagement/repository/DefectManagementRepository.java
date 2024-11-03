package com.ERP.FinalProject.domain.production.DefectManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.production.DefectManagement.entity.DefectManagement;

import java.util.List;

public interface DefectManagementRepository extends JpaRepository<DefectManagement, Integer> {
    // 특정 상태의 불량 항목 조회
    List<DefectManagement> findByStatus(String status);
}
