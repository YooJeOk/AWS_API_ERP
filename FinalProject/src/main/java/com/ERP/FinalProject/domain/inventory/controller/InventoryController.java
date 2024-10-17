package com.ERP.FinalProject.domain.inventory.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InventoryController {

	@GetMapping("/test/test")
	public String test() {
		return "test!!!!!!!!!!!!";
	}
}

