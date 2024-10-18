package com.ERP.FinalProject.domain.kiosk.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.kiosk.entity.Coffee;
import com.ERP.FinalProject.domain.kiosk.repository.KioskCoffeeRepository;
import com.ERP.FinalProject.domain.kiosk.repository.KioskProductRepository;

@Service
public class KioskService {

	@Autowired
	private KioskProductRepository kioskProductRepository;
	
	@Autowired
	private KioskCoffeeRepository kioskCoffeeRepository;
	
	public Page<Product> getRecommendedProducts(Pageable pageable) {
		return kioskProductRepository.findByRecommend("Y",pageable);
	}

	public Page<Coffee> getRecommendedCoffees(Pageable pageable) {
		return kioskCoffeeRepository.findByRecommend("Y",pageable);
	}

}
