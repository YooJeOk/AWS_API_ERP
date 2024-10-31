package com.ERP.FinalProject.domain.SalesManagement.Service;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesRecord;
import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesDetailRepository;
import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesRecordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SalesManagementService {

    @Autowired
    private SalesRecordRepository salesRecordRepository;

    @Autowired
    private SalesDetailRepository salesDetailRepository;

    public SalesRecord getSalesRecordWithDetails(Long saleId) {
        SalesRecord salesRecord = salesRecordRepository.findById(saleId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid SaleID: " + saleId));
        
        // salesRecord 객체를 그대로 반환하여 클라이언트에서 관련 정보를 모두 조회 가능하게 함
        return salesRecord;
    }
}
