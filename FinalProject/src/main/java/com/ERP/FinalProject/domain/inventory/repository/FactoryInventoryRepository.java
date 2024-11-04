package com.ERP.FinalProject.domain.inventory.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.inventory.entity.FactoryInventory;

public interface FactoryInventoryRepository extends JpaRepository<FactoryInventory, Long>{

	Optional<FactoryInventory> findByProductId(Long productId);

	Optional<FactoryInventory> findByMaterialId(Long materialId);
	
//	Optional<FactoryInventory> findByProductIdOrMaterialId(Long productId, Long materialId);
	
	  List<FactoryInventory> findByProductIdOrMaterialId(Long productId, Long materialId);
	  

}
