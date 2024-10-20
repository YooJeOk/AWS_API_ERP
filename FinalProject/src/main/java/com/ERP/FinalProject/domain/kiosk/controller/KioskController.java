package com.ERP.FinalProject.domain.kiosk.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.kiosk.entity.Coffee;
import com.ERP.FinalProject.domain.kiosk.service.KioskService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api/menu")
public class KioskController {

    @Autowired
    private KioskService kioskService;

    @GetMapping("/recommended")
    public ResponseEntity<Map<String, Object>> getRecommendedItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Object> recommendedItems = kioskService.getRecommendedItems(pageable);
        
   
        return createResponse(recommendedItems);
    }

    @GetMapping("/bread")
    public ResponseEntity<Map<String, Object>> getBreadItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> breadItems = kioskService.getBreadItems(pageable);
        System.out.println("breadItems:"+breadItems);
        return createResponse(breadItems);
    }

    @GetMapping("/coffee/ice")
    public ResponseEntity<Map<String, Object>> getIceCoffeeItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Coffee> iceCoffeeItems = kioskService.getIceCoffeeItems(pageable);
        return createResponse(iceCoffeeItems);
    }

    @GetMapping("/coffee/hot")
    public ResponseEntity<Map<String, Object>> getHotCoffeeItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Coffee> hotCoffeeItems = kioskService.getHotCoffeeItems(pageable);
        return createResponse(hotCoffeeItems);
    }
    
    protected ResponseEntity<Map<String, Object>> createResponse(Page<?> page) {
        Map<String, Object> response = new HashMap<>();
        response.put("items", page.getContent());
        response.put("currentPage", page.getNumber());
        response.put("totalItems", page.getTotalElements());
        response.put("totalPages", page.getTotalPages());
        return ResponseEntity.ok(response);
    }
}