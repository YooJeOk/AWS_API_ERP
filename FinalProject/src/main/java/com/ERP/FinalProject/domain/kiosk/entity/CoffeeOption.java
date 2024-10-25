package com.ERP.FinalProject.domain.kiosk.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CoffeeOptions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoffeeOption {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int optionId;
    private int materialId;
    private String name;
    private int price;

}
