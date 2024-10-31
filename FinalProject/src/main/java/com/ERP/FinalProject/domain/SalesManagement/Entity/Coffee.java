package com.ERP.FinalProject.domain.SalesManagement.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity(name = "SalesManagementCoffee") // 고유한 엔터티 이름 설정
public class Coffee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer coffeeID;

    private String coffeeName;

    // Getters, Setters, Constructors
}
