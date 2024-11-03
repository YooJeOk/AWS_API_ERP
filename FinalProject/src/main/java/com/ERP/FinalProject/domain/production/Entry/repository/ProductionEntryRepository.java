package com.ERP.FinalProject.domain.production.Entry.repository;

import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionEntryRepository extends JpaRepository<ProductionEntry, Integer> {
}
