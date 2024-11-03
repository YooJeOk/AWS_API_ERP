package com.ERP.FinalProject.domain.production.Entry.repository;

import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionEntryRepository extends JpaRepository<ProductionEntry, Integer> {

    // QCID로 이미 입고된 항목이 있는지 확인
    boolean existsByQcid(int qcid);
}
