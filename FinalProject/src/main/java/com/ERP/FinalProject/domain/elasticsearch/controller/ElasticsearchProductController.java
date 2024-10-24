package com.ERP.FinalProject.domain.elasticsearch.controller;

import com.ERP.FinalProject.domain.elasticsearch.entity.ElasticsearchProduct;
import com.ERP.FinalProject.domain.elasticsearch.service.ElasticsearchProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.elasticsearch.index.query.QueryBuilders.matchAllQuery;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ElasticsearchProductController {

    @Autowired
    private ElasticsearchProductService elasticsearchProductService;

    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;

    @GetMapping("/sync")
    public String syncProducts() {
        elasticsearchProductService.syncDatabaseWithElasticsearch();
        return "Products synchronized successfully!";
    }

    @GetMapping("/search")
    public SearchHits<ElasticsearchProduct> getAllProducts() {
        Query query = new NativeSearchQueryBuilder()
                .withQuery(matchAllQuery())
                .build();
        return elasticsearchRestTemplate.search(query, ElasticsearchProduct.class);
    }
}
