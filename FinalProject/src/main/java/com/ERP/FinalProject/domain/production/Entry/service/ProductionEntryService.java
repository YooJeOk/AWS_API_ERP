// ProductionEntryService.java
package com.ERP.FinalProject.domain.production.Entry.service;

import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntry;
import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntryRequest;
import com.ERP.FinalProject.domain.production.Entry.repository.ProductionEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionEntryService {

    private final ProductionEntryRepository productionEntryRepository;

    @Autowired
    public ProductionEntryService(ProductionEntryRepository productionEntryRepository) {
        this.productionEntryRepository = productionEntryRepository;
    }

    public void registerProductionEntry(ProductionEntryRequest request) {
        // 기존 등록 로직
    }

    public List<ProductionEntry> getAllEntries() {
        return productionEntryRepository.findAll();
    }
}
