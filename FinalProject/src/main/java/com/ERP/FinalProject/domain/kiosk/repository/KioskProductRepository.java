package com.ERP.FinalProject.domain.kiosk.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.inventory.entity.Product;

public interface KioskProductRepository extends JpaRepository<Product, Long>{

}
