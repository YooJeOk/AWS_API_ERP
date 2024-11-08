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
public class SalesStatusController {

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

        // 어제, 지난주, 지난달, 작년의 기간 계산
        LocalDateTime startOfYesterday = startOfDay.minusDays(1);
        LocalDateTime endOfYesterday = startOfDay.minusSeconds(1);

        LocalDateTime startOfLastWeek = startOfWeek.minusWeeks(1);
        LocalDateTime endOfLastWeek = startOfWeek.minusSeconds(1);

        LocalDateTime startOfLastMonth = now.withDayOfMonth(1).minusMonths(1).toLocalDate().atStartOfDay();
        LocalDateTime endOfLastMonth = startOfMonth.minusSeconds(1);

        LocalDateTime startOfLastYear = now.withDayOfYear(1).minusYears(1).toLocalDate().atStartOfDay();
        LocalDateTime endOfLastYear = startOfYear.minusSeconds(1);

        // 이번 기간 데이터
        totalSalesData.put("todayAmount", salesRecordRepository.calculateTotalSales(startOfDay, now));
        totalSalesData.put("todayCount", salesRecordRepository.calculateTotalQuantitySold(startOfDay, now));

        totalSalesData.put("thisWeekAmount", salesRecordRepository.calculateTotalSales(startOfWeek, now));
        totalSalesData.put("thisWeekCount", salesRecordRepository.calculateTotalQuantitySold(startOfWeek, now));

        totalSalesData.put("thisMonthAmount", salesRecordRepository.calculateTotalSales(startOfMonth, now));
        totalSalesData.put("thisMonthCount", salesRecordRepository.calculateTotalQuantitySold(startOfMonth, now));

        totalSalesData.put("thisYearAmount", salesRecordRepository.calculateTotalSales(startOfYear, now));
        totalSalesData.put("thisYearCount", salesRecordRepository.calculateTotalQuantitySold(startOfYear, now));

        // 이전 기간 데이터 추가
        totalSalesData.put("yesterdayAmount", salesRecordRepository.calculateTotalSales(startOfYesterday, endOfYesterday));
        totalSalesData.put("yesterdayCount", salesRecordRepository.calculateTotalQuantitySold(startOfYesterday, endOfYesterday));

        totalSalesData.put("lastWeekAmount", salesRecordRepository.calculateTotalSales(startOfLastWeek, endOfLastWeek));
        totalSalesData.put("lastWeekCount", salesRecordRepository.calculateTotalQuantitySold(startOfLastWeek, endOfLastWeek));

        totalSalesData.put("lastMonthAmount", salesRecordRepository.calculateTotalSales(startOfLastMonth, endOfLastMonth));
        totalSalesData.put("lastMonthCount", salesRecordRepository.calculateTotalQuantitySold(startOfLastMonth, endOfLastMonth));

        totalSalesData.put("lastYearAmount", salesRecordRepository.calculateTotalSales(startOfLastYear, endOfLastYear));
        totalSalesData.put("lastYearCount", salesRecordRepository.calculateTotalQuantitySold(startOfLastYear, endOfLastYear));

        return totalSalesData;
    }
}

