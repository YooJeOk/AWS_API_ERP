package com.ERP.FinalProject.domain.production.Entry.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntry;

import java.util.List;

public interface ProductionEntryRepository extends JpaRepository<ProductionEntry, Long> {

    boolean existsByQcid(Integer qcid);

    @Query("SELECT p.qcid FROM ProductionEntry p WHERE p.qcid IS NOT NULL")
    List<Integer> findAllQcids(); // 입고 내역에 존재하는 모든 QCID를 조회하는 메서드
}
