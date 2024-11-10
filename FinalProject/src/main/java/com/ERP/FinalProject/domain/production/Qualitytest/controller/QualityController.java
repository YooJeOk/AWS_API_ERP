package com.ERP.FinalProject.domain.production.Qualitytest.controller;

import com.ERP.FinalProject.domain.production.Qualitytest.entity.QualityControl;
import com.ERP.FinalProject.domain.production.Qualitytest.entity.QualityControlDTO;
import com.ERP.FinalProject.domain.production.Qualitytest.service.QualitytestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quality-control")
public class QualityController {

    @Autowired
    private QualitytestService qualitytestService;

    // 조회 엔드포인트
    @GetMapping
    public List<QualityControlDTO> getAllQualityControls() {
        return qualitytestService.getAllQualityControls();
    }

    
    // 품질 검사 데이터 등록
    @PostMapping
    public QualityControl addQualityControlData(@RequestBody QualityControl qualityControl) {
        return qualitytestService.saveQualityControlData(qualityControl);
    }
}