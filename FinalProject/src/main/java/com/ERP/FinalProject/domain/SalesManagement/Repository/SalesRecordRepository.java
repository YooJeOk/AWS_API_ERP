package com.ERP.FinalProject.domain.SalesManagement.Repository;
import com.ERP.FinalProject.domain.kiosk.entity.SalesRecord;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SalesRecordRepository extends JpaRepository<SalesRecord, Long> {
    
    @EntityGraph(attributePaths = "salesDetails")
    List<SalesRecord> findAll();
}

