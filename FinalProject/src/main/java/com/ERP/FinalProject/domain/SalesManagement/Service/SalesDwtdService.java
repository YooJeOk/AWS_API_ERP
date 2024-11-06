package com.ERP.FinalProject.domain.SalesManagement.Service;

import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesDwtdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SalesDwtdService {

    @Autowired
    private SalesDwtdRepository salesRecordRepository;

    public Map<String, Integer> getSalesByDayOfWeek() {
        List<Object[]> salesData = salesRecordRepository.getSalesByDayOfWeek();
        Map<String, Integer> salesByDay = new HashMap<>();

        String[] daysOfWeek = {"일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"};

        for (Object[] data : salesData) {
            int dayIndex = ((Number) data[0]).intValue() - 1; // DAYOFWEEK 반환 값이 1~7이므로 인덱스를 맞추기 위해 -1
            int totalSales = ((Number) data[1]).intValue();
            salesByDay.put(daysOfWeek[dayIndex], totalSales);
        }

        return salesByDay;
    }
    
    public Map<Integer, Double> getAverageSalesByHour() {
        List<Object[]> salesData = salesRecordRepository.getAverageSalesByHour();
        Map<Integer, Double> salesByHour = new HashMap<>();

        for (Object[] data : salesData) {
            int hour = (int) data[0];
            double avgSales = (double) data[1];
            salesByHour.put(hour, avgSales);
        }

        return salesByHour;
    }
    
}
