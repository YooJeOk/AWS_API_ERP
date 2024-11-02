package com.ERP.FinalProject.domain.production.Qualitytest.repository;

import com.ERP.FinalProject.domain.production.Qualitytest.entity.QualityControl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualitytestRepository extends JpaRepository<QualityControl, Long> {
    
}
