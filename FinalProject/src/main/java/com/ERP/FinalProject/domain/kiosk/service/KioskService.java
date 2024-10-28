package com.ERP.FinalProject.domain.kiosk.service;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.kiosk.entity.Coffee;
import com.ERP.FinalProject.domain.kiosk.entity.CoffeeOption;
import com.ERP.FinalProject.domain.kiosk.repository.CoffeeOptionsRepository;
import com.ERP.FinalProject.domain.kiosk.repository.KioskCoffeeRepository;
import com.ERP.FinalProject.domain.kiosk.repository.KioskProductRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class KioskService {

	@Autowired
	private KioskProductRepository productRepository;

	@Autowired
	private KioskCoffeeRepository coffeeRepository;

	@Autowired
	private CoffeeOptionsRepository coffeeOptionsRepository;
	
	public Page<Object> getRecommendedItems(Pageable pageable) {
	    // 전체 추천 아이템 수를 먼저 계산
	    long totalProducts = productRepository.countByProductCategoryAndRecommend("bread", "Y");
	    long totalCoffees = coffeeRepository.countByRecommend("Y");
	    long totalItems = totalProducts + totalCoffees;

	    int pageSize = pageable.getPageSize();
	    int currentPage = pageable.getPageNumber();
	    int startItem = currentPage * pageSize;
	    List<Object> recommendedItems = new ArrayList<>();

	    if (startItem < totalItems) {
	        int endItem = Math.min(startItem + pageSize, (int) totalItems);
	        
	        // 빵 아이템 가져오기
	        if (startItem < totalProducts) {
	            int productsToFetch = (int) Math.min(endItem, totalProducts) - startItem;
	            Page<Product> recommendedProducts = productRepository.findByProductCategoryAndRecommend("bread", "Y", 
	                PageRequest.of(currentPage, productsToFetch));
	            recommendedItems.addAll(recommendedProducts.getContent());
	        }

	        // 커피 아이템 가져오기
	        if (endItem > totalProducts) {
	            int coffeeStartItem = (int) Math.max(0, startItem - totalProducts);
	            int coffeesToFetch = endItem - Math.max(startItem, (int) totalProducts);
	            Page<Coffee> recommendedCoffees = coffeeRepository.findByRecommend("Y", 
	                PageRequest.of(coffeeStartItem / pageSize, coffeesToFetch));
	            recommendedItems.addAll(recommendedCoffees.getContent());
	            
	        }
	    }

		/*
		 * log.info("Total Recommended Products: {}", totalProducts);
		 * log.info("Total Recommended Coffees: {}", totalCoffees);
		 * log.info("Total Recommended Items: {}", totalItems);
		 * log.info("Current Page Items: {}", recommendedItems.size());
		 */

	    return new PageImpl<>(recommendedItems, pageable, totalItems);
	}

    public Page<Product> getBreadItems(Pageable pageable) {
	    long totalBread = productRepository.countByProductCategoryAndRecommend("bread", "N");
	    int pageSize = pageable.getPageSize();
	    int currentPage = pageable.getPageNumber();
        Page<Product> Breads = productRepository.findByRecommendAndProductCategory("N", "bread",PageRequest.of(currentPage, pageSize));
     
	    return new PageImpl<>(Breads.getContent(), pageable, totalBread);
    }

    public Page<Coffee> getIceCoffeeItems(Pageable pageable) {
        return coffeeRepository.findByRecommendAndTemperature("N", "ICE", pageable);
    }

    public Page<Coffee> getHotCoffeeItems(Pageable pageable) {
        return coffeeRepository.findByRecommendAndTemperature("N", "HOT", pageable);
    }
    
    //커피옵션
    public List<CoffeeOption> getAllCoffeeOptions() {
        return coffeeOptionsRepository.findAll();
    }

    public CoffeeOption getCoffeeOptionById(Long id) {
        return coffeeOptionsRepository.findById(id).orElse(null);
    }
}
