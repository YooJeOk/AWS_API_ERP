package com.ERP.FinalProject.domain.inventory.service;

import com.ERP.FinalProject.domain.inventory.repository.ProductRepository;
import com.ERP.FinalProject.domain.inventory.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}