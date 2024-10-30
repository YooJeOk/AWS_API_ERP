package com.ERP.FinalProject.domain.production.planning.service;

import com.ERP.FinalProject.domain.production.planning.model.ProductionEntry;
import com.ERP.FinalProject.domain.production.planning.model.ProductionEntryDTO;
import com.ERP.FinalProject.domain.production.planning.repository.ProductionEntryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductionEntryService {

    private final ProductionEntryRepository productionEntryRepository;

    public ProductionEntryService(ProductionEntryRepository productionEntryRepository) {
        this.productionEntryRepository = productionEntryRepository;
    }

    // 기본 ProductionEntry DTO 목록을 반환
    public List<ProductionEntryDTO> getProductionEntries() {
        return productionEntryRepository.findAll().stream()
                .map(entry -> new ProductionEntryDTO(
                        entry.getOrderId(),
                        entry.getProductId(),
                        entry.getQuantity(),
                        entry.getEntryDate(),
                        entry.getEtc()
                ))
                .collect(Collectors.toList());
    }

    // ProductionEntry 데이터를 저장
    public boolean saveProductionEntry(ProductionEntry productionEntry) {
        productionEntryRepository.save(productionEntry);
        return true;
    }
}
