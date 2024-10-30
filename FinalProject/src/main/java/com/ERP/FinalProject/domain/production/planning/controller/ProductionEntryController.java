package com.ERP.FinalProject.domain.production.planning.controller;

import com.ERP.FinalProject.domain.production.planning.model.ProductionEntry;

import com.ERP.FinalProject.domain.production.planning.service.ProductionEntryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/production-entry")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductionEntryController {

	private final ProductionEntryService productionEntryService;

	public ProductionEntryController(ProductionEntryService productionEntryService) {
		this.productionEntryService = productionEntryService;
	}

	@PostMapping("/create")
	public ResponseEntity<?> createProductionEntry(@RequestBody ProductionEntry request) {
		System.out.println("create()");
		productionEntryService.saveProductionEntry(request);
		return ResponseEntity.ok().body("등록 완료");
	}
}
