package com.ERP.FinalProject.domain.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.KioskManagement.entity.StoreInventory;
import com.ERP.FinalProject.domain.KioskManagement.repository.StoreInventoryRepository;
import com.ERP.FinalProject.domain.inventory.dto.MaterialsInventoryDTO;
import com.ERP.FinalProject.domain.inventory.dto.ProductDTO;
import com.ERP.FinalProject.domain.inventory.entity.FactoryInventory;
import com.ERP.FinalProject.domain.inventory.entity.MaterialsInventory;
import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.inventory.repository.FactoryInventoryRepository;
import com.ERP.FinalProject.domain.inventory.repository.MaterialsInventoryRepository;
import com.ERP.FinalProject.domain.kiosk.repository.KioskProductRepository;

@Service
public class FactoryInventoryService {
    @Autowired
    private KioskProductRepository productRepository;

    @Autowired
    private MaterialsInventoryRepository materialsInventoryRepository;

    @Autowired
    private FactoryInventoryRepository factoryInventoryRepository;

    public Page<ProductDTO> getProductInventory(Pageable pageable, String search) {
        if (search != null && !search.isEmpty()) {
            return productRepository.findByProductNameContainingOrProductCategoryContaining(search, search, pageable)
                    .map(this::convertToProductInventoryDTO);
        }
        return productRepository.findAll(pageable).map(this::convertToProductInventoryDTO);
    }

    public Page<MaterialsInventoryDTO> getMaterialInventory(Pageable pageable, String search) {
        if (search != null && !search.isEmpty()) {
            return materialsInventoryRepository.findByMaterialNameContainingOrCategoryContaining(search, search, pageable)
                    .map(this::convertToMaterialInventoryDTO);
        }
        return materialsInventoryRepository.findAll(pageable).map(this::convertToMaterialInventoryDTO);
    }

    private ProductDTO convertToProductInventoryDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setProductCategory(product.getProductCategory());
        dto.setUnitPrice(product.getUnitPrice());
        dto.setSalePrice(product.getSalePrice());
        dto.setProductionDate(product.getProductionDate());
        dto.setRecommend(product.getRecommend());
        dto.setDetailDescription(product.getDetailDescription());

        FactoryInventory factoryInventory = factoryInventoryRepository.findByProductId(product.getProductId())
                .orElse(new FactoryInventory());
        dto.setQuantityInStore(factoryInventory.getQuantityInFactory());

        return dto;
    }

    private MaterialsInventoryDTO convertToMaterialInventoryDTO(MaterialsInventory material) {
        MaterialsInventoryDTO dto = new MaterialsInventoryDTO();
        dto.setMaterialId(material.getMaterialId());
        dto.setMaterialName(material.getMaterialName());
        dto.setCategory(material.getCategory());
        dto.setUnit(material.getUnit());
        dto.setUnitPrice(material.getUnitPrice());
        dto.setLastUpdated(material.getLastUpdated());

        FactoryInventory factoryInventory = factoryInventoryRepository.findByMaterialId(material.getMaterialId())
                .orElse(new FactoryInventory());
        dto.setQuantityInStore(factoryInventory.getQuantityInFactory());
        
        return dto;
    }
}