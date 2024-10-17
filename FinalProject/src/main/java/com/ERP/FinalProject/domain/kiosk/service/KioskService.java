package com.ERP.FinalProject.domain.kiosk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.kiosk.repository.KioskRepository;

@Service
public class KioskService {

	@Autowired
	private KioskRepository repo;

	public Page<Product> findAll(Pageable pageable) {
		return repo.findAll(pageable);
	}
}
