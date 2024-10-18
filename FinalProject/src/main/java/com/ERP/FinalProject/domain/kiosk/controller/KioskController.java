package com.ERP.FinalProject.domain.kiosk.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.kiosk.entity.Coffee;
import com.ERP.FinalProject.domain.kiosk.entity.Coffee;
import com.ERP.FinalProject.domain.kiosk.service.KioskService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class KioskController {

	@Autowired
	private KioskService kioskservice;

	
	@GetMapping("/recommended")
	public ResponseEntity<Map<String, Object>> kioskmenu(Model model, @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "6") int size) {
		
		log.info("키오스크컨트롤러 /recommended 실행");
		Pageable pageable = PageRequest.of(page, size);
		Page<Product> Products = kioskservice.getProducts(pageable);
		Page<Coffee> Coffees = kioskservice.getCoffees(pageable);

		
        List<Object> recommendedItems = new ArrayList<>();
        List<Object> breadItems = new ArrayList<>();
        List<Object> coffeeIceItems = new ArrayList<>();
        List<Object> coffeeHotItems = new ArrayList<>();
        
        for (Product product : Products.getContent()) {
            if ("Y".equals(product.getRecommend())) {
                recommendedItems.add(product);  
            } else {
                breadItems.add(product);
            }
        }
        for (Coffee coffee : Coffees) {
            if ("Y".equals(coffee.getRecommend())) {
                recommendedItems.add(coffee); 
            } else if ("ICE".equals(coffee.getTemperature())) {
                coffeeIceItems.add(coffee); 
            } else if ("HOT".equals(coffee.getTemperature())) {
                coffeeHotItems.add(coffee); 
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("추천메뉴", recommendedItems);  
        response.put("빵", breadItems);  
        response.put("커피(ice)", coffeeIceItems);  
        response.put("커피(hot)", coffeeHotItems);  
        
        System.out.println("추천메뉴: "+recommendedItems);
        System.out.println("빵: "+breadItems);
        System.out.println("커피(ice): "+coffeeIceItems);
        System.out.println("커피(hot): "+coffeeHotItems);


        return ResponseEntity.ok(response);
		
	}
}
