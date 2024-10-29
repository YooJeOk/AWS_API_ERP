package com.ERP.FinalProject.domain.kiosk.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.inventory.dto.ProductDTO;
import com.ERP.FinalProject.domain.inventory.entity.Product;

public interface KioskProductRepository extends JpaRepository<Product, Long> {

	Page<Product> findByRecommend(String recommend, Pageable pageable);

	Page<Product> findByProductCategoryAndRecommend(String productCategory, String recommend, Pageable pageable);
	
	Page<Product> findByRecommendAndProductCategory(String recommend, String category, Pageable pageable);
	
	long countByProductCategoryAndRecommend(String category, String recommend);

	Page<Product> findByOnKiosk(Pageable pageable, String OnKiosk);
}
