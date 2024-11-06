package com.ERP.FinalProject.domain.SalesManagement.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesProductRepository;
import com.ERP.FinalProject.domain.SalesManagement.Service.SalesProductService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SalesProductController {

    @Autowired
    private SalesProductRepository salesProductRepository;

    @GetMapping("/sales-product-analysis")
    public List<Map<String, Object>> getSalesData(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {

        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        List<Object[]> results = salesProductRepository.findSalesByProductAndDateRange(start.atStartOfDay(), end.atTime(23, 59, 59));
        return results.stream().map(row -> {
            Map<String, Object> map = new HashMap<>();
            map.put("name", row[0]);
            map.put("sales", row[1]);
            map.put("date", row[2].toString());
            return map;
        }).collect(Collectors.toList());
    }
}
