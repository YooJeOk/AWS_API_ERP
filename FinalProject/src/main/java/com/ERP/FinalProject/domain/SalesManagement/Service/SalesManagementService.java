package com.ERP.FinalProject.domain.SalesManagement.Service;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesDetails;
import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesRecord;
import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesManagementService {

    @Autowired
    private SalesRecordRepository salesRecordRepository;

    public List<SalesRecord> getAllSalesRecords() {
        try {
            return salesRecordRepository.findAllWithDetails(); // salesRecordRepository의 커스텀 메서드 호출
        } catch (Exception e) {
            // 예외 발생 시 로그 출력 및 null 반환
            System.err.println("Error retrieving sales records: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }


	}

