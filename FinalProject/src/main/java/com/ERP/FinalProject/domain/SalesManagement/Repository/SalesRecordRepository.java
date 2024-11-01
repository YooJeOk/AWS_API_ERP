package com.ERP.FinalProject.domain.SalesManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesRecord;

import java.util.List;

@Repository
public interface SalesRecordRepository extends JpaRepository<SalesRecord, Integer> {

    @Query("SELECT DISTINCT sr FROM SalesManagementSalesRecord sr " +
           "JOIN FETCH sr.salesDetails sd " +
           "LEFT JOIN FETCH sd.product p " +
           "LEFT JOIN FETCH sd.coffee c")
    List<SalesRecord> findAllWithDetails();
}
