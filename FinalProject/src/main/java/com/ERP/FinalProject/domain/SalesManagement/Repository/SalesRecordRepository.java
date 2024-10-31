package com.ERP.FinalProject.domain.SalesManagement.Repository;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesRecordRepository extends JpaRepository<SalesRecord, Long> {
}
