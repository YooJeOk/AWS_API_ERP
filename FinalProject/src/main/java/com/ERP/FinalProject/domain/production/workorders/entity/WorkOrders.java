package com.ERP.FinalProject.domain.production.workorders.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "WorkOrders", schema = "ERP")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderID")
    private Integer orderId;

    @Column(name = "ProductID")
    private Integer productId;

    @Column(name = "Quantity")
    private Integer quantity;

    @Column(name = "StartDate")
    private LocalDateTime startDate;

    @Column(name = "EndDate")
    private LocalDateTime endDate;

    @Column(name = "Status")
    private String status;

    @Column(name = "Priority")
    private String priority;

    @Column(name = "WeighingComplete")
    private Boolean weighingComplete = false;

    @Column(name = "DoughComplete")
    private Boolean doughComplete = false;

    @Column(name = "FirstFermentationComplete")
    private Boolean firstFermentationComplete = false;

    @Column(name = "DivisionComplete")
    private Boolean divisionComplete = false;

    @Column(name = "RoundingComplete")
    private Boolean roundingComplete = false;

    @Column(name = "IntermediateFermentationComplete")
    private Boolean intermediateFermentationComplete = false;

    @Column(name = "ShapingComplete")
    private Boolean shapingComplete = false;

    @Column(name = "PanningComplete")
    private Boolean panningComplete = false;

    @Column(name = "SecondFermentationComplete")
    private Boolean secondFermentationComplete = false;

    @Column(name = "BakingComplete")
    private Boolean bakingComplete = false;

    @Column(name = "CoolingComplete")
    private Boolean coolingComplete = false;

    @Column(name = "PackagingComplete")
    private Boolean packagingComplete = false;

    @Column(name = "etc")
    private String etc;
}
