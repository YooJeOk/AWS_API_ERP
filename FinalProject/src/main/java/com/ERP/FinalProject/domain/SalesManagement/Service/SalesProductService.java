package com.ERP.FinalProject.domain.SalesManagement.Service;

import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class SalesProductService {

    @Autowired
    private SalesProductRepository salesDetailsRepository;

    public List<Map<String, Object>> getSalesDataByDateRange(LocalDate startDate, LocalDate endDate) {
        // 기존 메서드에서 startDate와 endDate가 LocalDate 타입임을 반영하도록 수정합니다.
        List<Object[]> results = salesDetailsRepository.findSalesByProductAndDateRange(startDate.atStartOfDay(), endDate.atTime(23, 59, 59));
        return results.stream().map(row -> {
            Map<String, Object> map = new HashMap<>();
            map.put("name", row[0] != null ? row[0] : row[1]);
            map.put("sales", row[2]);
            map.put("date", row[3].toString());
            return map;
        }).collect(Collectors.toList());
    }
}
