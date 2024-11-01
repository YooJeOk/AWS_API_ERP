package com.ERP.FinalProject.domain.production.MBOM.repository;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOMDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MBOMRepository extends JpaRepository<MBOM, Integer> {

	@Query("SELECT new com.ERP.FinalProject.domain.production.MBOM.entity.MBOMDTO(" +
		       "mb.bomId, mb.itemId, mb.itemType, mb.size, mb.materialId, m.materialName, " +
		       "mb.productName, mb.quantity, mb.unit, mb.unitPrice, mb.totalCost) " +
		       "FROM MBOM mb " +
		       "JOIN MaterialsInventory m ON mb.materialId = m.materialId")

    List<MBOMDTO> findAllWithMaterialName();
}
