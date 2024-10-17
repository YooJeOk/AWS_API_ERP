package com.ERP.FinalProject.domain.kiosk.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KioskController {

	@GetMapping("/hello")
	public String hello() {
		return "hello";
	}
}
