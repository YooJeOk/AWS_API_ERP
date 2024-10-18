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
	
	public Page<Product> getProducts(Pageable pageable) {
		return kioskProductRepository.findAll(pageable);
	}

	public Page<Coffee> getCoffees(Pageable pageable) {
		// TODO Auto-generated method stub
		System.out.println("키오스크 서비스의 모든 커피 가져오기: "+kioskCoffeeRepository.findAll(pageable).getContent());
		return kioskCoffeeRepository.findAll(pageable);
	}

}
