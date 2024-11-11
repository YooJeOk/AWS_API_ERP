package com.ERP.FinalProject.domain.inventory.repository;

import com.ERP.FinalProject.domain.inventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
