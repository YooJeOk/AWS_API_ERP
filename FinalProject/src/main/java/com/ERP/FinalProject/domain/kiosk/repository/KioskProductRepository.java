package com.ERP.FinalProject.domain.kiosk.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.inventory.dto.ProductDTO;
import com.ERP.FinalProject.domain.inventory.entity.Product;

public interface KioskProductRepository extends JpaRepository<Product, Long> {

	Page<Product> findByRecommendAndOnKiosk(String recommend, String onKiosk, Pageable pageable);

	Page<Product> findByProductCategoryAndRecommendAndOnKiosk(String productCategory, String recommend,String OnKiosk, Pageable pageable);
	
	Page<Product> findByRecommendAndProductCategoryAndOnKiosk(String recommend, String category,  String OnKiosk,Pageable pageable);
	
	long countByProductCategoryAndRecommendAndOnKiosk(String category, String recommend, String OnKiosk);
	
	//키오스크 관리
	Page<Product> findByOnKiosk(Pageable pageable, String OnKiosk);
	
	Page<Product> findByProductCategoryAndOnKiosk(String category, String onKiosk, Pageable pageable);
	
	//검색기능
	Page<Product> findByProductNameContainingOrProductCategoryContaining(String name, String category, Pageable pageable);
	
    Page<Product> findByProductCategoryAndOnKioskAndProductNameContaining(String category, String onKiosk, String search, Pageable pageable);

}
