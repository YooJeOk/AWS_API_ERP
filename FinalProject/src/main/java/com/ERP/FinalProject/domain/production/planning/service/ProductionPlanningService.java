package com.ERP.FinalProject.domain.production.planning.service;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanningDTO;
import com.ERP.FinalProject.domain.production.planning.repository.ProductionPlanningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductionPlanningService {

    private final ProductionPlanningRepository repository;

    // 생성자를 통한 의존성 주입
    @Autowired
    public ProductionPlanningService(ProductionPlanningRepository repository) {
        this.repository = repository;
    }

    // 특정 ProductID로 가공된 생산 계획과 MRP 데이터를 DTO로 반환
    public List<ProductionPlanningDTO> getProcessedPlanningDataByProductId(Integer productId) {
        List<Object[]> rawData = repository.findProductionAndMrpDataByProductId(productId);
        List<ProductionPlanningDTO> processedData = new ArrayList<>();

        for (Object[] row : rawData) {
            int orderId = (Integer) row[0];
            int productIdResult = (Integer) row[1];
            String startDate = (String) row[2];
            String endDate = (String) row[3];
            int plannedQuantity = ((Number) row[4]).intValue();
            int materialId = (Integer) row[5];
            String materialName = (String) row[6];
            double requiredMaterialQty = ((Number) row[7]).doubleValue();
            double materialCost = ((Number) row[8]).doubleValue();
            double totalMrpCost = ((Number) row[9]).doubleValue();
            String etc = (String) row[10];

            processedData.add(new ProductionPlanningDTO(orderId, productIdResult, startDate, endDate, plannedQuantity,
                    materialId, materialName, requiredMaterialQty, materialCost, totalMrpCost, etc));
        }

        return processedData;
    }
}