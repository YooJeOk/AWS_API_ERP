package com.ERP.FinalProject.domain.SalesManagement.Repository;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesDetail;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesDetailRepository extends JpaRepository<SalesDetail, Long> {
    // 특정 SaleID를 기준으로 SalesDetails 조회
    List<SalesDetail> findBySalesRecord_SaleId(Long saleId);
}