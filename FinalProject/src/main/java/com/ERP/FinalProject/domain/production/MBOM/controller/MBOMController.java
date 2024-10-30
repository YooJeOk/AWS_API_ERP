package com.ERP.FinalProject.domain.production.MBOM.controller;


import com.ERP.FinalProject.domain.production.MBOM.entitiy.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.entitiy.MBOMEntry;
import com.ERP.FinalProject.domain.production.MBOM.service.MBOMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/MBOM")
@CrossOrigin(origins = "http://localhost:8080")
public class MBOMController {

    @Autowired
    private MBOMService mbomService;

    
    
    public MBOMController(MBOMService mbomService) {
				this.mbomService = mbomService;
	}

 
		@PostMapping("/create")
    public ResponseEntity<String> createMBOM(@RequestBody MBOMEntry mbomEntry) {
        try {
            MBOM savedMBOM = mbomService.saveMBOM(mbomEntry);
            return ResponseEntity.ok("생산 주문이 성공적으로 등록되었습니다: " + savedMBOM);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("생산 주문 등록 실패: " + e.getMessage());
        }
    }
}
