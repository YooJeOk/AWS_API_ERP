package com.ERP.FinalProject.domain.production.DefectManagement.repository;

import com.ERP.FinalProject.domain.production.DefectManagement.entity.DefectManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DefectManagementRepository extends JpaRepository<DefectManagement, Integer> {

    // 특정 QCID로 불량 항목 조회
    Optional<DefectManagement> findByQcid(int qcid);

    // 특정 상태로 불량 항목 조회
    List<DefectManagement> findByStatus(String status);

    // QCID를 기반으로 불량 수량 조회
    @Query("SELECT SUM(d.defectQuantity) FROM DefectManagement d WHERE d.qcid = :qcid")
    Optional<Integer> findDefectQuantityByQCID(@Param("qcid") int qcid);

    // "완료" 상태의 QCID만 가져오는 메서드
    @Query("SELECT d.qcid FROM DefectManagement d WHERE d.status = '완료'")
    List<Integer> findCompletedQcids();
}
