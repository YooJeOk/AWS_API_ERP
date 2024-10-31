package com.ERP.FinalProject.domain.SalesManagement.Controller;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesRecord;
import com.ERP.FinalProject.domain.SalesManagement.Service.SalesManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api/sales")
public class SalesRecordController {

    @Autowired
    private SalesManagementService salesService;

    @GetMapping("/{saleId}")
    public SalesRecord getSalesRecordWithDetails(@PathVariable Long saleId) {
        return salesService.getSalesRecordWithDetails(saleId);
    }
}