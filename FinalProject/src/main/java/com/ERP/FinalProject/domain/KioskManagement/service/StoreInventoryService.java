package com.ERP.FinalProject.domain.KioskManagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.KioskManagement.entity.StoreInventory;
import com.ERP.FinalProject.domain.KioskManagement.repository.StoreInventoryRepository;
import com.ERP.FinalProject.domain.inventory.dto.MaterialsInventoryDTO;
import com.ERP.FinalProject.domain.inventory.dto.ProductDTO;
import com.ERP.FinalProject.domain.inventory.entity.MaterialsInventory;
import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.inventory.repository.MaterialsInventoryRepository;
import com.ERP.FinalProject.domain.kiosk.repository.KioskProductRepository;

@Service
public class StoreInventoryService {
	@Autowired
	private KioskProductRepository productRepository;

	@Autowired
	private MaterialsInventoryRepository materialsInventoryRepository;
	@Autowired
	private StoreInventoryRepository storeInventoryRepository;

	public Page<ProductDTO> getProductInventory(Pageable pageable) {
		return productRepository.findAll(pageable).map(this::convertToProductInventoryDTO);
	}

	private ProductDTO convertToProductInventoryDTO(Product product) {
		ProductDTO dto = new ProductDTO();
		dto.setProductId(product.getProductId());
		dto.setProductName(product.getProductName());
		dto.setProductCategory(product.getProductCategory());
		dto.setSalePrice(product.getSalePrice());
		dto.setProductionDate(product.getProductionDate());
		dto.setRecommend(product.getRecommend());
		dto.setDetailDescription(product.getDetailDescription());

		StoreInventory storeInventory = storeInventoryRepository.findByProductId(product.getProductId())
				.orElse(new StoreInventory());
		dto.setQuantityInStore(storeInventory.getQuantityInStore());

		return dto;
	}

	public Page<MaterialsInventoryDTO> getMaterialInventory(Pageable pageable) {
        return materialsInventoryRepository.findMaterialsWithStoreInventory(pageable)
                .map(this::convertToMaterialInventoryDTO);
    }

    private MaterialsInventoryDTO convertToMaterialInventoryDTO(MaterialsInventory material) {
        MaterialsInventoryDTO dto = new MaterialsInventoryDTO();
        dto.setMaterialId(material.getMaterialId());
        dto.setMaterialName(material.getMaterialName());
        dto.setCategory(material.getCategory());
        dto.setUnit(material.getUnit());
        dto.setUnitPrice(material.getUnitPrice());
        dto.setLastUpdated(material.getLastUpdated());

        StoreInventory storeInventory = storeInventoryRepository.findByMaterialId(material.getMaterialId())
                .orElse(new StoreInventory());
        dto.setQuantityInStore(storeInventory.getQuantityInStore());
        
        return dto;
    }
}