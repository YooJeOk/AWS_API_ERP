package com.ERP.FinalProject.domain.MainPage.Entity;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "calendar") 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // 컬럼 이름을 "id"로 설정
    private Long id;

    @Column(name = "title", nullable = false, length = 255) // 컬럼 이름을 "title"로 설정, Not null 제약 조건 및 길이 설정
    private String title;

    @Column(name = "date", nullable = false) // 컬럼 이름을 "date"로 설정, Not null 제약 조건 설정
    private LocalDate date;

    // Getters and Setters are provided by Lombok
}
