package com.ERP.FinalProject.domain.production.Qualitytest.entity;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class QualityControlDTO {

    private Long QCID;
    private int OrderID;
    private int Quantity;
    private int ProductID;
    private String ProductName;
    private String TestResult;
    private LocalDateTime TestDate;
    private String etc;

  
}
