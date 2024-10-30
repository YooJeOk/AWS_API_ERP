package com.ERP.FinalProject.domain.production.MBOM.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.production.MBOM.entitiy.MBOM;

public interface MBOMRepository extends JpaRepository<MBOM, Integer> {
}
