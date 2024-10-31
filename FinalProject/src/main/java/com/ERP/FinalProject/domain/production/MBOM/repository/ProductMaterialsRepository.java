package com.ERP.FinalProject.domain.production.MBOM.repository;

import com.ERP.FinalProject.domain.production.MBOM.entity.ProductMaterials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMaterialsRepository extends JpaRepository<ProductMaterials, Integer> {
 
}
