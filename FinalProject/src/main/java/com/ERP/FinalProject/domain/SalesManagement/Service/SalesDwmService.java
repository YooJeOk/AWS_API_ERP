package com.ERP.FinalProject.domain.SalesManagement.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesDwmRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class SalesDwmService {

    @Autowired
    private SalesDwmRepository salesRecordRepository;

    public List<Map<String, Object>> getSalesDataByPeriod(String period) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDate;

        switch (period) {
            case "day":
                startDate = now.minusDays(365); // 지난 1년간 일별 데이터
                return salesRecordRepository.findDailySales(startDate, now);
            case "week":
                startDate = now.minusWeeks(52); // 지난 1년간 주별 데이터
                return salesRecordRepository.findWeeklySales(startDate, now);
            case "month":
                startDate = now.minusMonths(12); // 지난 1년간 월별 데이터
                return salesRecordRepository.findMonthlySales(startDate, now);
            default:
                throw new IllegalArgumentException("Invalid period: " + period);
        }
    }
}
