package com.ERP.FinalProject.domain.production.MBOM.repository;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MBOMRepository extends JpaRepository<MBOM, Integer> {

   
}
