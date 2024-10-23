package com.ERP.FinalProject.domain.kiosk.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.kiosk.entity.SalesRecords;
import com.ERP.FinalProject.domain.kiosk.service.SalesRecordsService;

@RestController
@RequestMapping("/api/sales")
public class SalesRecordsController {

    @Autowired
    private SalesRecordsService salesRecordsService;

    @PostMapping
    public SalesRecords saveSalesRecord(@RequestBody SalesRecords salesRecords) {
        return salesRecordsService.saveSalesRecord(
                salesRecords.getPaymentType(),
                salesRecords.getTotalSalePrice()
        );
    }
}