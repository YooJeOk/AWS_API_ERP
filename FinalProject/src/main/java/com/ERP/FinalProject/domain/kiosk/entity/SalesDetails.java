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
@Table(name = "SalesDetails")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int detailID;

    private int saleID;

    private int productID;

    private int coffeeID;

    private int quantitySold;

    private int salePrice;

}
