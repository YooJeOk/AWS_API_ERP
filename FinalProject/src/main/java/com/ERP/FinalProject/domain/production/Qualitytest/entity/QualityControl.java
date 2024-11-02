package com.ERP.FinalProject.domain.production.Qualitytest.entity;

import javax.persistence.*;

import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "QualityControl")
@Data
public class QualityControl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long QCID; // 품질관리ID

    private int OrderID; // 주문ID
    private int Quantity; // 수량
    private int ProductID; // 상품ID
    private String ProductName; // 상품명
    private String TestResult; // 검사 결과
    private LocalDateTime TestDate; // 검사 날짜
    private String etc; // 기타 사항


    public Long getQCID() {
        return QCID;
    }

    public void setQCID(Long QCID) {
        this.QCID = QCID;
    }

    
}
