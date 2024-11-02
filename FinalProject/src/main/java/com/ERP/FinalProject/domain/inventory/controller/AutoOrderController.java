package com.ERP.FinalProject.domain.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.inventory.dto.AutoOrderUpdateRequest;
import com.ERP.FinalProject.domain.inventory.service.AutoOrderService;

@RestController
@RequestMapping("/api/auto-orders")
public class AutoOrderController {

    @Autowired
    private AutoOrderService autoOrderService;

    @PostMapping("/check")
    public ResponseEntity<String> checkAndCreateAutoOrders() {
        autoOrderService.checkAndCreateAutoOrders();
        return ResponseEntity.ok("Auto orders checked and created if necessary");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateAutoOrderSetting(@RequestBody AutoOrderUpdateRequest request) {
        autoOrderService.updateAutoOrderSetting(request.getItemId(), request.getCategory(), request.getAutoOrder(), request.getAutoOrderQuantity());
        return ResponseEntity.ok("Auto order setting updated");
    }
}