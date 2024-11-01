package com.ERP.FinalProject.domain.KioskManagement.repository;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.KioskManagement.entity.StoreInventory;
import com.ERP.FinalProject.domain.inventory.entity.Product;

public interface StoreInventoryRepository  extends JpaRepository<StoreInventory, Long> {

	 Optional<StoreInventory> findByProductId(Long productId);
	 
	 Optional<StoreInventory> findByMaterialId(Long materialId);
}

