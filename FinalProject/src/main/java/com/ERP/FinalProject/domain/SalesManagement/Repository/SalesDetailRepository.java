package com.ERP.FinalProject.domain.SalesManagement.Repository;


import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesDetails;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesDetailRepository extends JpaRepository<SalesDetails, Long> {
}