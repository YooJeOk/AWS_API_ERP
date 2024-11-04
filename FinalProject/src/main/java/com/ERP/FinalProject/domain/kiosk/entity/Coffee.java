package com.ERP.FinalProject.domain.kiosk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "coffee", schema = "ERP")
public class Coffee {
	
	@Id
	@Column(name="CoffeeID")
    private Long coffeeId;
	
	@Column(name="CoffeeName")
    private String coffeeName;
	
	@Column(name="SalePrice")
    private Integer salePrice;
	
	@Column(name="CoffeeImage")
    private String coffeeImage;
	
	@Column(name="OnKiosk")
    private String onKiosk;
	
	@Column(name="Recommend")
    private String recommend;
	
	@Column(name="Temperature")
	private String temperature;
	
	@Column(name="DetailDescription")
    private String detailDescription;
}