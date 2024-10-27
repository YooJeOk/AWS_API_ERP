package com.ERP.FinalProject.domain.production.planning.service;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanningDTO;
import com.ERP.FinalProject.domain.production.planning.repository.ProductionPlanningRepository;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@Service
public class ProductionPlanningService {

    private final ProductionPlanningRepository productionPlanningRepository;
    private final DataSource dataSource; // DataSource 추가

    public ProductionPlanningService(ProductionPlanningRepository productionPlanningRepository, DataSource dataSource) {
        this.productionPlanningRepository = productionPlanningRepository;
        this.dataSource = dataSource; // DataSource 초기화
    }

    // 기본 Production Planning DTO를 조회
    public List<ProductionPlanningDTO> getBasicProductionPlanning() {
        return productionPlanningRepository.getBasicProductionPlanningData();
    }

    // Production Planning 데이터 저장
    public boolean saveProductionPlanning(ProductionPlanning productionPlanning) {
        try (Connection connection = dataSource.getConnection()) { // 데이터베이스 연결
            return productionPlanningRepository.save(productionPlanning, connection);
        } catch (SQLException e) {
            e.printStackTrace();
            return false; // 예외 발생 시 false 반환
        }
    }
}
