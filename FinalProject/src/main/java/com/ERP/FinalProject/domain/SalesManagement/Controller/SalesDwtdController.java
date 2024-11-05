package com.ERP.FinalProject.domain.SalesManagement.Controller;
import com.ERP.FinalProject.domain.SalesManagement.Service.SalesDwtdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SalesDwtdController {

    @Autowired
    private SalesDwtdService salesRecordService;

    @GetMapping("/sales-by-day")
    public Map<String, Integer> getSalesByDayOfWeek() {
        return salesRecordService.getSalesByDayOfWeek();
    }
}

