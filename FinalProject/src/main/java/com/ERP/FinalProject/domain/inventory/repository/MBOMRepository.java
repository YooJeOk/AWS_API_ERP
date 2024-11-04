package com.ERP.FinalProject.domain.inventory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.inventory.entity.MBOM;

public interface MBOMRepository extends JpaRepository<MBOM, Long> {
    List<MBOM> findByItemIdAndItemTypeAndSize(Long itemId, String itemType, String size);
}

