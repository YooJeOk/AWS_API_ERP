package com.ERP.FinalProject.domain.kiosk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.kiosk.entity.SalesRecords;
import com.ERP.FinalProject.domain.kiosk.repository.SalesRecordsRepository;

import java.time.LocalDateTime;

@Service
public class SalesRecordsService {

    @Autowired
    private SalesRecordsRepository salesRecordsRepository;

    public SalesRecords saveSalesRecord(String paymentType, int totalSalePrice) {
        SalesRecords salesRecord = new SalesRecords();
        salesRecord.setSaleDate(LocalDateTime.now());
        salesRecord.setPaymentType(paymentType);
        salesRecord.setTotalSalePrice(totalSalePrice);
        return salesRecordsRepository.save(salesRecord);
    }
}