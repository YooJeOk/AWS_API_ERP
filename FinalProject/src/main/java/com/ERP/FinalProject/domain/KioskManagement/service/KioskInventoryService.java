package com.ERP.FinalProject.domain.KioskManagement.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.KioskManagement.entity.StoreInventory;
import com.ERP.FinalProject.domain.KioskManagement.repository.StoreInventoryRepository;
import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.kiosk.entity.Coffee;
import com.ERP.FinalProject.domain.kiosk.repository.KioskCoffeeRepository;
import com.ERP.FinalProject.domain.kiosk.repository.KioskProductRepository;

@Service
public class KioskInventoryService {
    @Autowired
    private KioskProductRepository productRepository;

    @Autowired
    private KioskCoffeeRepository coffeeRepository;

    @Autowired
    private StoreInventoryRepository storeInventoryRepository;

    public Page<Product> getProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByProductCategoryAndOnKiosk("bread", "Y", pageable);
    }

    public Page<Coffee> getCoffees(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return coffeeRepository.findByOnKiosk("Y",pageable);
    }

    public Integer getProductInventory(Product product) {
        Optional<StoreInventory> inventory = storeInventoryRepository.findByProductId(product.getProductId());
        return inventory.map(StoreInventory::getQuantityInStore).orElse(0);
    }
    @Transactional
    public void updateProducts(List<Product> products) {
        productRepository.saveAll(products);
    }

    @Transactional
    public void updateCoffees(List<Coffee> coffees) {
        coffeeRepository.saveAll(coffees);
    }

    @Transactional
    public void updateProductOnKiosk(Long productId, String onKiosk) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setOnKiosk(onKiosk);
        productRepository.save(product);
    }

    @Transactional
    public void updateCoffeeOnKiosk(Long coffeeId, String onKiosk) {
        Coffee coffee = coffeeRepository.findById(coffeeId)
                .orElseThrow(() -> new RuntimeException("Coffee not found"));
        coffee.setOnKiosk(onKiosk);
        coffeeRepository.save(coffee);
    }
}