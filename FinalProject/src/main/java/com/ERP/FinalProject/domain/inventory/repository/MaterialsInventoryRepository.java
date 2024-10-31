package com.ERP.FinalProject.domain.inventory.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ERP.FinalProject.domain.inventory.dto.MaterialsInventoryDTO;
import com.ERP.FinalProject.domain.inventory.dto.ProductDTO;
import com.ERP.FinalProject.domain.inventory.entity.MaterialsInventory;

public interface MaterialsInventoryRepository extends JpaRepository<MaterialsInventory, Long> {

	@Query("SELECT m FROM MaterialsInventory m WHERE EXISTS (SELECT 1 FROM StoreInventory s WHERE s.materialId = m.materialId)")
	Page<MaterialsInventory> findMaterialsWithStoreInventory(Pageable pageable);

	
}