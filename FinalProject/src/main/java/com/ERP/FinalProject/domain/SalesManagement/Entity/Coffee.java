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
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Coffee")  // 실제 MySQL 테이블명과 일치
@Entity(name = "SalesManagementCoffee") // 고유한 엔터티 이름 설정
public class Coffee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer coffeeID;

    @Column(name = "CoffeeName")
    private String coffeeName;

    // 나머지 필드 생략
}