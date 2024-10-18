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
		Page<Product> recommendedProducts = kioskservice.getRecommendedProducts(pageable);
		Page<Coffee> recommendedCoffees = kioskservice.getRecommendedCoffees(pageable);

		List<Object> recommendedItems = new ArrayList<Object>();
		recommendedItems.addAll(recommendedProducts.getContent());
		recommendedItems.addAll(recommendedCoffees.getContent());

		int totalElements = (int) (recommendedProducts.getTotalElements() + recommendedCoffees.getTotalElements());
		int totalPages = (int) Math.ceil((double) totalElements / size);

		System.out.println("totalElements: "+totalElements);
		System.out.println("recommendedItems: "+recommendedItems);
		Map<String, Object> response = new HashMap<>();
		response.put("items", recommendedItems);
        response.put("currentPage", page);
        response.put("totalItems", totalElements);
        response.put("totalPages", totalPages);

        return ResponseEntity.ok(response);
		
	}
}
