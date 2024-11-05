//package com.ERP.FinalProject.domain.SalesManagement.Controller;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.ERP.FinalProject.domain.SalesManagement.Service.SalesDwmService;
//
//import java.util.List;
//import java.util.Map;
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api")
//public class SalesDwmController {
//
//    @Autowired
//    private SalesDwmService salesService;
//
//    @GetMapping("/dwm")
//    public List<Map<String, Object>> getSalesData(@RequestParam String period) {
//        return salesService.getSalesDataByPeriod(period);
//    }
//}
