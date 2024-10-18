package com.ERP.FinalProject.domain.kiosk.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "StoreCoffeeTypes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coffee {
	
	@Id
    private Long coffeeId;
    private String coffeeName;
    private Integer salePrice;
    private String coffeeImage;
    private String recommend;
    private String temperature;
    private String detailDescription;
}
