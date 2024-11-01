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
		       "mb.productName, mb.quantity, mb.unit, mb.unitPrice, mb.totalCost, " +
		       "m.supplier.supplierId, m.supplier.supplierName, " +
		       "CASE WHEN m.supplier.supplierId = 1 THEN '빵' " +
		       "     WHEN m.supplier.supplierId = 2 THEN '커피' " +
		       "     WHEN m.supplier.supplierId = 3 THEN '부자재' " +
		       "     ELSE '기타' END) " +
		       "FROM MBOM mb " +
		       "JOIN MaterialsInventory m ON mb.materialId = m.materialId " +
		       "JOIN m.supplier s")
		List<MBOMDTO> findAllWithMaterialNameAndSupplier();

}
