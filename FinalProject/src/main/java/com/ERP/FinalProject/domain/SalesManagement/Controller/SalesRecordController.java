package com.ERP.FinalProject.domain.SalesManagement.Controller;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesRecord;
import com.ERP.FinalProject.domain.SalesManagement.Service.SalesManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SalesRecordController {

    @Autowired
    private SalesManagementService salesRecordService;

    @GetMapping("/salesrecord")
    public ResponseEntity<?> getAllSalesRecords() {
        try {
            List<SalesRecord> salesRecords = salesRecordService.getAllSalesRecords();
            if (salesRecords == null) {
                // null인 경우 빈 리스트 반환 및 204 상태 코드 설정
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No sales records found.");
            }
            return ResponseEntity.ok(salesRecords);
        } catch (Exception e) {
            System.err.println("Error in SalesRecordController: " + e.getMessage());
            e.printStackTrace();
            // 예외 발생 시 500 상태 코드 및 에러 메시지 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving sales records.");
        }
    }
}
