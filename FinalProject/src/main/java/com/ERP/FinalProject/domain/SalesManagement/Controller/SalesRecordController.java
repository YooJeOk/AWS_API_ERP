package com.ERP.FinalProject.domain.SalesManagement.Controller;
import com.ERP.FinalProject.domain.SalesManagement.Service.SalesRecordService;
import com.ERP.FinalProject.domain.kiosk.entity.SalesRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SalesRecordController {

    private final SalesRecordService salesRecordService;

    @Autowired
    public SalesRecordController(SalesRecordService salesRecordService) {
        this.salesRecordService = salesRecordService;
    }

    @GetMapping("/records")
    public List<SalesRecord> getAllSalesRecords() {
        return salesRecordService.getAllSalesRecords();
    }
}
