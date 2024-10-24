package com.ERP.FinalProject.domain.inventory.repository;

import com.ERP.FinalProject.domain.inventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    // 추가적인 쿼리 메서드 작성 가능
}
