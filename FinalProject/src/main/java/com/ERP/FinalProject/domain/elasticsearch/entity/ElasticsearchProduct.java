package com.ERP.FinalProject.domain.elasticsearch.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "products")  // Elasticsearch에 저장될 인덱스 이름
public class ElasticsearchProduct {

    @Id
    private String id;  // Elasticsearch에서의 ID

    private String name;
    private String category;
    private Double price;

    // Constructors, Getters and Setters
    public ElasticsearchProduct() {}

    public ElasticsearchProduct(String id, String name, String category, Double price) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
    }

    // Getters and setters for each field
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
