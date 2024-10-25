package com.ERP.FinalProject.domain.kiosk.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "SalesRecords")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesRecord {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long saleID;
	private LocalDateTime saleDate;
	private String paymentType;
	private Integer totalSalePrice;
	private Integer orderAmount;
	private Integer discountAmount;

	@OneToMany(mappedBy = "salesRecord", cascade = CascadeType.ALL,orphanRemoval = true)
	private List<SalesDetail> salesDetails;

}
