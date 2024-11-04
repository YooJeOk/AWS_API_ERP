package com.ERP.FinalProject.domain.production.planning.model;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductionPlanningDTO {
    private int planId; // 생산 계획 ID
    private int orderId; // 작업 지시 ID
    private int productId; // 제품 ID
    private LocalDateTime startDate; // 생산 계획 시작 날짜
    private LocalDateTime endDate; // 생산 계획 종료 날짜
    private int orderQuantity; // 작업 지시에 따른 제품 수량
    private String productName; // 제품 이름
    private String etc;
}
