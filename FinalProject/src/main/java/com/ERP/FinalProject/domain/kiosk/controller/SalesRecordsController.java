package com.ERP.FinalProject.domain.kiosk.controller;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.kiosk.entity.CoffeeOptionSalesDetail;
import com.ERP.FinalProject.domain.kiosk.entity.SalesDetail;
import com.ERP.FinalProject.domain.kiosk.entity.SalesRecord;

import com.ERP.FinalProject.domain.kiosk.service.KioskUserService;
import com.ERP.FinalProject.domain.kiosk.service.SalesRecordsService;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/sales")
public class SalesRecordsController {

    @Autowired
    private SalesRecordsService salesRecordsService;

    @Autowired
    private KioskUserService kioskUserService;
    
    @PostMapping
    public ResponseEntity<?> saveSalesRecord(@RequestBody Map<String, Object> requestData) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            
            // SalesRecord 처리
            Map<String, Object> salesRecordsMap = (Map<String, Object>) requestData.get("salesRecords");
            SalesRecord salesRecord = objectMapper.convertValue(salesRecordsMap, SalesRecord.class);
            salesRecord.setSaleDate(LocalDateTime.now());
            
            // CartItems 처리
            List<Map<String, Object>> cartItemsList = (List<Map<String, Object>>) requestData.get("cartItems");
            List<SalesDetail> salesDetailsList = new ArrayList<>();
            
            for (Map<String, Object> cartItem : cartItemsList) {
                SalesDetail salesDetail = new SalesDetail();
                salesDetail.setProductID(cartItem.get("productId") != null ? ((Integer) cartItem.get("productId")) : null);
                salesDetail.setCoffeeID(cartItem.get("coffeeId") != null ? ((Integer) cartItem.get("coffeeId")) : null);
                salesDetail.setQuantitySold((Integer) cartItem.get("quantity"));
                salesDetail.setSalePrice((Integer) cartItem.get("totalPrice"));
                salesDetail.setSalesRecord(salesRecord);
                
                if ("coffee".equals(cartItem.get("type"))) {
                    Map<String, Object> options = (Map<String, Object>) cartItem.get("options");
                    if (options != null) {
                        List<Map<String, Object>> additionalOptions = (List<Map<String, Object>>) options.get("additionalOptions");
                        List<CoffeeOptionSalesDetail> optionDetailsList = new ArrayList<>();
                        
                        for (Map<String, Object> option : additionalOptions) {
                            CoffeeOptionSalesDetail optionDetail = new CoffeeOptionSalesDetail();
                            optionDetail.setOptionID((Integer) option.get("id"));
                            optionDetail.setOptionQuantity((Integer) option.get("quantity"));
                            optionDetail.setOptionPrice((Integer) option.get("price"));
                            optionDetail.setOptionSize((String) options.get("size"));
                            optionDetail.setOptionTemperature((String) options.get("temperature"));  // 온도 정보 설정
                            optionDetail.setSalesDetail(salesDetail);
                            optionDetailsList.add(optionDetail);
                        }
                        
                        salesDetail.setCoffeeOptionSalesDetails(optionDetailsList);
                    }
                }
                
                salesDetailsList.add(salesDetail);
            }
            
            salesRecord.setSalesDetails(salesDetailsList);
   
            SalesRecord savedSalesRecord = salesRecordsService.saveSalesRecord(salesRecord);
            

            Map<String, Object> userDataMap = (Map<String, Object>) requestData.get("userData");
            if (userDataMap != null && userDataMap.get("phone") != null) {
                kioskUserService.incrementStampByPhone((String) userDataMap.get("phone"));
            }
            
            return ResponseEntity.ok(savedSalesRecord);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("오류 발생: " + e.getMessage());
        }
    }
}