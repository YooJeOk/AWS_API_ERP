package com.ERP.FinalProject.domain.SalesManagement.Service;

import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesRecordRepository;
import com.ERP.FinalProject.domain.kiosk.entity.SalesRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SalesRecordService {

    private final SalesRecordRepository salesRecordRepository;

    @Autowired
    public SalesRecordService(SalesRecordRepository salesRecordRepository) {
        this.salesRecordRepository = salesRecordRepository;
    }

    public List<SalesRecord> getAllSalesRecords() {
        return salesRecordRepository.findAll();
    }
}
