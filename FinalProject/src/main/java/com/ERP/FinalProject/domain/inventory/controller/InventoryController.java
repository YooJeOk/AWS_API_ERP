//package com.ERP.FinalProject.domain.inventory.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.ERP.FinalProject.domain.inventory.service.InventoryService;
//
//@RestController
//@RequestMapping("/api/inventory")
//public class InventoryController {
//
//    @Autowired
//    private InventoryService inventoryService;
//
//    @PostMapping("/update")
//    public ResponseEntity<?> updateInventory(@RequestBody SaleRequest saleRequest) {
//        inventoryService.updateInventory(saleRequest.getCartItems());
//        return ResponseEntity.ok().build();
//    }
//    
//    
//
//}