package com.ERP.FinalProject.domain.production.Qualitytest.service;

import com.ERP.FinalProject.domain.production.Qualitytest.entity.QualityControl;
import com.ERP.FinalProject.domain.production.Qualitytest.entity.QualityControlDTO;
import com.ERP.FinalProject.domain.production.Qualitytest.repository.QualitytestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QualitytestService {

    @Autowired
    private QualitytestRepository qualitytestRepository;

    // 조회 기능
    public List<QualityControlDTO> getAllQualityControls() {
        return qualitytestRepository.findAll().stream()
                .map(qualityControl -> {
                    QualityControlDTO dto = new QualityControlDTO();
                    dto.setQCID(qualityControl.getQCID());
                    dto.setOrderID(qualityControl.getOrderID());
                    dto.setQuantity(qualityControl.getQuantity());
                    dto.setProductID(qualityControl.getProductID());
                    dto.setProductName(qualityControl.getProductName());
                    dto.setTestResult(qualityControl.getTestResult());
                    dto.setTestDate(qualityControl.getTestDate());
                    dto.setEtc(qualityControl.getEtc());
                    return dto;
                })
                .collect(Collectors.toList());
    }

 // 품질 검사 데이터 저장
    public QualityControl saveQualityControlData(QualityControl qualityControl) {
        return qualitytestRepository.save(qualityControl);
    }
}
