package com.ERP.FinalProject.domain.elasticsearch.service;

import com.ERP.FinalProject.domain.elasticsearch.entity.ElasticsearchProduct;
import com.ERP.FinalProject.domain.elasticsearch.repository.ElasticsearchProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ElasticsearchProductService {

    @Autowired
    private ElasticsearchProductRepository productRepository;

    public ElasticsearchProduct save(ElasticsearchProduct product) {
        return productRepository.save(product);
    }

    public Optional<ElasticsearchProduct> findById(String id) {
        return productRepository.findById(id);
    }

    public Iterable<ElasticsearchProduct> findAll() {
        return productRepository.findAll();
    }

    public void deleteById(String id) {
        productRepository.deleteById(id);
    }
}
