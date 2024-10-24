package com.ERP.FinalProject.domain.elasticsearch.repository;

import com.ERP.FinalProject.domain.elasticsearch.entity.ElasticsearchProduct;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ElasticsearchProductRepository extends ElasticsearchRepository<ElasticsearchProduct, String> {
    // 추가적인 쿼리 메서드 정의 가능
}
