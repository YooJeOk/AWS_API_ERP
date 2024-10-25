package com.ERP.FinalProject.domain.kiosk.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SalesDetails")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long saleDetailID;

	@ManyToOne
	@JoinColumn(name = "saleID")
	private SalesRecord salesRecord;

	@Column(nullable = true)
	private Integer productID;
	
	@Column(nullable = true)
	private Integer coffeeID;
	private Integer quantitySold;
	private Integer salePrice;

	@OneToMany(mappedBy = "salesDetail", cascade = CascadeType.ALL,orphanRemoval = true)
	private List<CoffeeOptionSalesDetail> coffeeOptionSalesDetails;

}
