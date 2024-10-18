package com.ERP.FinalProject.domain.kiosk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.kiosk.service.KioskService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class KioskController {

	@Autowired
	private KioskService service;
	
	@GetMapping("/kioskmenu")
	public String kioskmenu(Model model,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "추천메뉴") String category) {
		Pageable pageable = PageRequest.of(page, 6);
		Page<Product> KioskMenuPage = service.findAll(pageable);
		log.info("키오스크 메뉴 데이터:" + KioskMenuPage);	
		//test=ds
		return "";
	}
}