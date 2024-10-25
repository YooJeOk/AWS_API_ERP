package com.ERP.FinalProject.domain.kiosk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.kiosk.entity.SalesRecords;
import com.ERP.FinalProject.domain.kiosk.entity.UserStamp;
import com.ERP.FinalProject.domain.kiosk.service.KioskUserService;
import com.ERP.FinalProject.domain.kiosk.service.SalesRecordsService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/sales")
public class SalesRecordsController {

    @Autowired
    private SalesRecordsService salesRecordsService;

    @Autowired
    private KioskUserService kioskUserService;
    
    @PostMapping
    public SalesRecords saveSalesRecord(@RequestBody String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootNode = objectMapper.readTree(jsonString);

            SalesRecords salesRecords = objectMapper.treeToValue(rootNode.get("salesRecords"), SalesRecords.class);
            UserStamp userData = objectMapper.treeToValue(rootNode.get("userData"), UserStamp.class);

            // 판매 기록 저장 로직
            SalesRecords savedSalesRecord = salesRecordsService.saveSalesRecord(
                salesRecords.getPaymentType(),
                salesRecords.getTotalSalePrice(),
                salesRecords.getOrderAmount(),
                salesRecords.getDiscountAmount()
            );

            // 유저 데이터가 있을 경우 스탬프 증가
            if (userData != null && userData.getPhone() != null) {
                kioskUserService.incrementStampByPhone(userData.getPhone());
            }

            return savedSalesRecord;
        } catch (Exception e) {
            throw new RuntimeException("오류 발생", e);
        }
    }


}