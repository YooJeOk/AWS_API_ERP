package com.ERP.FinalProject.domain.kiosk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CoffeeOptionSalesDetails")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoffeeOptionSalesDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long coffeeOptionDetailID;

	@ManyToOne
	@JoinColumn(name = "saleDetailID")
	private SalesDetail salesDetail;

	@Column(nullable = true)
	private Integer optionID;
	
	private Integer optionQuantity;
	private Integer optionPrice;
	private String optionSize;
	private String optionTemperature;
}
