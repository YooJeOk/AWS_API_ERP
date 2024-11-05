package com.ERP.FinalProject.domain.production.monitoring.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class ProductionProcessStatus {
    
    @Id
    private Long monitorID;
    private String status;
    private boolean weighingComplete;
    private boolean doughComplete;
    private boolean firstFermentationComplete;
    private boolean divisionComplete;
    private boolean roundingComplete;
    private boolean intermediateFermentationComplete;
    private boolean shapingComplete;
    private boolean panningComplete;
    private boolean secondFermentationComplete;
    private boolean bakingComplete;
    private boolean coolingComplete;
    private boolean packagingComplete;

    // Getters and Setters
}
