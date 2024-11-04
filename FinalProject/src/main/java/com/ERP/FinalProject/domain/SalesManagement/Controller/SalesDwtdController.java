package com.ERP.FinalProject.domain.SalesManagement.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesStatusRepository;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Map;
import java.util.HashMap;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SalesDwtdController {

    @Autowired
    private SalesStatusRepository salesRecordRepository;

    @GetMapping("/totalsales")
    public Map<String, Object> getTotalSales() {
        Map<String, Object> totalSalesData = new HashMap<>();

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfDay = now.toLocalDate().atStartOfDay();
        LocalDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).toLocalDate().atStartOfDay();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).toLocalDate().atStartOfDay();
        LocalDateTime startOfYear = now.withDayOfYear(1).toLocalDate().atStartOfDay();

        totalSalesData.put("todayAmount", salesRecordRepository.calculateTotalSales(startOfDay, now));
        totalSalesData.put("todayCount", salesRecordRepository.calculateTotalQuantitySold(startOfDay, now));
        
        totalSalesData.put("thisWeekAmount", salesRecordRepository.calculateTotalSales(startOfWeek, now));
        totalSalesData.put("thisWeekCount", salesRecordRepository.calculateTotalQuantitySold(startOfWeek, now));

        totalSalesData.put("thisMonthAmount", salesRecordRepository.calculateTotalSales(startOfMonth, now));
        totalSalesData.put("thisMonthCount", salesRecordRepository.calculateTotalQuantitySold(startOfMonth, now));

        totalSalesData.put("thisYearAmount", salesRecordRepository.calculateTotalSales(startOfYear, now));
        totalSalesData.put("thisYearCount", salesRecordRepository.calculateTotalQuantitySold(startOfYear, now));

        return totalSalesData;
    }
}
