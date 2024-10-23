package com.ERP.FinalProject.domain.elasticsearch.repository;

import com.ERP.FinalProject.domain.elasticsearch.entity.ElasticsearchProduct;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElasticsearchProductRepository extends ElasticsearchRepository<ElasticsearchProduct, String> {
}
