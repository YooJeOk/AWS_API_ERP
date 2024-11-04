package com.ERP.FinalProject.domain.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ERP.FinalProject.domain.KioskManagement.service.StoreInventoryService;
import com.ERP.FinalProject.domain.inventory.dto.MaterialsInventoryDTO;
import com.ERP.FinalProject.domain.inventory.dto.ProductDTO;
import com.ERP.FinalProject.domain.inventory.service.FactoryInventoryService;


@RestController
@RequestMapping("/api/factory/inventory")
public class FactoryInventoryController {
    @Autowired
    private FactoryInventoryService inventoryService;

    @GetMapping("/products")
    public ResponseEntity<Page<ProductDTO>> getProductInventory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(inventoryService.getProductInventory(PageRequest.of(page, size), search));
    }

    @GetMapping("/materials")
    public ResponseEntity<Page<MaterialsInventoryDTO>> getMaterialInventory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(inventoryService.getMaterialInventory(PageRequest.of(page, size), search));
    }
}
