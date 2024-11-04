package com.ERP.FinalProject.domain.inventory.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ERP.FinalProject.domain.inventory.service.InventoryService;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/update")
    public ResponseEntity<?> updateInventory(@RequestBody Map<String, List<Map<String, Object>>> request) {
        List<Map<String, Object>> cartItems = request.get("cartItems");
        System.out.println("인벤토리 컨트롤러 실행");
        System.out.println("Received cart items: " + cartItems);  // 로그 추가
        inventoryService.updateInventory(cartItems);
        
        return ResponseEntity.ok().build();
    }
    
    
}