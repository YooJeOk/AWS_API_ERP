package com.ERP.FinalProject.domain.SalesManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesDetail;

public interface SalesDetailRepository extends JpaRepository<SalesDetail, Long> {
}