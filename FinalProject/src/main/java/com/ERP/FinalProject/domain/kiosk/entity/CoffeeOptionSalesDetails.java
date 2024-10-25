package com.ERP.FinalProject.domain.kiosk.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CoffeeOptionSalesDetails")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoffeeOptionSalesDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int optionDetailID;

    private int saleDetailID;

    private Long optionID;

    private int optionQuantity;

    private int optionPrice;

}
