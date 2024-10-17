package com.ERP.FinalProject.domain.kiosk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.inventory.entity.Product;

public interface KioskRepository extends JpaRepository<Product, Long>{

}
