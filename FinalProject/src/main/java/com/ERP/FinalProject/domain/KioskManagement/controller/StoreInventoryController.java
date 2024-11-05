package com.ERP.FinalProject.domain.KioskManagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ERP.FinalProject.domain.KioskManagement.service.StoreInventoryService;
import com.ERP.FinalProject.domain.inventory.dto.MaterialsInventoryDTO;
import com.ERP.FinalProject.domain.inventory.dto.ProductDTO;
import com.ERP.FinalProject.domain.inventory.entity.MaterialsInventory;
import com.ERP.FinalProject.domain.inventory.entity.Product;

@RestController
@RequestMapping("/api/store/inventory")
public class StoreInventoryController {
    @Autowired
    private StoreInventoryService inventoryService;

    @GetMapping("/products")
    public ResponseEntity<Page<ProductDTO>> getProductInventory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(inventoryService.getProductInventory(PageRequest.of(page, size), search));
    }

    @GetMapping("/materials")
    public ResponseEntity<Page<MaterialsInventoryDTO>> getMaterialInventory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(inventoryService.getMaterialInventory(PageRequest.of(page, size), search));
    }
}