package com.ERP.FinalProject.domain.elasticsearch.controller;

import com.ERP.FinalProject.domain.elasticsearch.entity.ElasticsearchProduct;
import com.ERP.FinalProject.domain.elasticsearch.service.ElasticsearchProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ElasticsearchProductController {

    @Autowired
    private ElasticsearchProductService productService;

    @PostMapping
    public ElasticsearchProduct createProduct(@RequestBody ElasticsearchProduct product) {
        return productService.save(product);
    }

    @GetMapping("/{id}")
    public Optional<ElasticsearchProduct> getProduct(@PathVariable String id) {
        return productService.findById(id);
    }

    @GetMapping
    public Iterable<ElasticsearchProduct> getAllProducts() {
        return productService.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteById(id);
    }
}
