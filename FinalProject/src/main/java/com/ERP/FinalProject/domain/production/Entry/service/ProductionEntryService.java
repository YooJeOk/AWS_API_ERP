package com.ERP.FinalProject.domain.production.Entry.service;

import com.ERP.FinalProject.domain.production.DefectManagement.entity.DefectManagement;
import com.ERP.FinalProject.domain.production.DefectManagement.repository.DefectManagementRepository;
import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntry;
import com.ERP.FinalProject.domain.production.Entry.entity.ProductionEntryRequest;
import com.ERP.FinalProject.domain.production.Entry.repository.ProductionEntryRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductionEntryService {

    private final ProductionEntryRepository productionEntryRepository;
    private final DefectManagementRepository defectManagementRepository;

    @Autowired
    public ProductionEntryService(ProductionEntryRepository productionEntryRepository,
                                  DefectManagementRepository defectManagementRepository) {
        this.productionEntryRepository = productionEntryRepository;
        this.defectManagementRepository = defectManagementRepository;
    }

    public void registerProductionEntry(ProductionEntryRequest request) {
    	// QCID가 이미 등록되었는지 확인
        if (productionEntryRepository.existsByQcid(request.getQcid())) {
            throw new IllegalArgumentException("해당 QCID로 이미 입고된 데이터가 존재합니다.");
        }
    	
    	
    	
    	
    	
    	// DefectManagement에서 수량과 불량 수량 가져오기
        DefectManagement defectData = defectManagementRepository.findByQcid(request.getQcid())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 QCID입니다."));

        // 수량에서 불량 수량을 빼서 실제 입고 수량을 계산
        int adjustedQuantity = defectData.getQuantity() - defectData.getDefectQuantity();

        ProductionEntry productionEntry = new ProductionEntry();
        productionEntry.setOrderId(defectData.getOrderId());
        productionEntry.setQcid(defectData.getQcid());
        productionEntry.setQuantity(adjustedQuantity); // 계산된 수량 반영
        productionEntry.setProductId(defectData.getProductId());
        productionEntry.setProductName(defectData.getProductName());
        productionEntry.setEntryDate(request.getEntryDate());
        productionEntry.setEtc(request.getEtc());

        // ProductionEntry에 저장
        productionEntryRepository.save(productionEntry);
    }
    public List<ProductionEntry> getAllProductionEntries() {
        return productionEntryRepository.findAll();
    }
 // 입고 내역에 없는 QCID만 반환하는 메서드
    public List<Integer> getAvailableQCIDs() {
        List<Integer> allQcids = defectManagementRepository.findCompletedQcids(); // 완료된 QCID 조회
        List<Integer> registeredQcids = productionEntryRepository.findAllQcids(); // 이미 입고된 QCID 조회

        // 입고되지 않은 QCID만 필터링하여 반환
        return allQcids.stream()
                       .filter(qcid -> !registeredQcids.contains(qcid))
                       .collect(Collectors.toList());
    }
    
}
