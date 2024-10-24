package com.ERP.FinalProject.domain.kiosk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.kiosk.entity.CoffeeOptionSalesDetails;
import com.ERP.FinalProject.domain.kiosk.entity.SalesDetails;
import com.ERP.FinalProject.domain.kiosk.entity.SalesRecords;
import com.ERP.FinalProject.domain.kiosk.repository.CoffeeOptionSalesDetailsRepository;
import com.ERP.FinalProject.domain.kiosk.repository.SalesDetailsRepository;
import com.ERP.FinalProject.domain.kiosk.repository.SalesRecordsRepository;

import java.time.LocalDateTime;

@Service
public class SalesRecordsService {

    @Autowired
    private SalesRecordsRepository salesRecordsRepository;

    @Autowired
    private SalesDetailsRepository salesDetailsRepository;

    @Autowired
    private CoffeeOptionSalesDetailsRepository coffeeOptionSalesDetailsRepository;
    
    public SalesRecords saveSalesRecord(String paymentType, int totalSalePrice, int orderAmount, int discountAmount) {
        SalesRecords salesRecord = new SalesRecords();
        salesRecord.setSaleDate(LocalDateTime.now());
        salesRecord.setPaymentType(paymentType);
        salesRecord.setTotalSalePrice(totalSalePrice);
        salesRecord.setOrderAmount(orderAmount);
        salesRecord.setDiscountAmount(discountAmount);
        return salesRecordsRepository.save(salesRecord);
    }  
    
    
    
//    public int saveSalesDetail(int saleID, int productId, int coffeeId, int quantitySold, int salePrice) {
//        SalesDetails salesDetails = new SalesDetails();
//        salesDetails.setSaleID(saleID);
//        salesDetails.setProductID(productId);
//        salesDetails.setCoffeeID(coffeeId);
//        salesDetails.setQuantitySold(quantitySold);
//        salesDetails.setSalePrice(salePrice);
//
//        SalesDetails savedDetail = salesDetailsRepository.save(salesDetails);
//        return savedDetail.getSaleID(); 
//    }
//    
//
//    public CoffeeOptionSalesDetails saveCoffeeOptionDetail(int saleDetailId, Long optionID, int optionQuantity, int optionPrice) {
//        CoffeeOptionSalesDetails coffeeOptionDetail = new CoffeeOptionSalesDetails();
//        coffeeOptionDetail.setSaleDetailID(saleDetailId);
//        coffeeOptionDetail.setOptionID(optionID);
//        coffeeOptionDetail.setOptionQuantity(optionQuantity);
//        coffeeOptionDetail.setOptionPrice(optionPrice);
//
//        return coffeeOptionSalesDetailsRepository.save(coffeeOptionDetail);
//    }

    
}
