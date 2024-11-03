package com.ERP.FinalProject.domain.production.Entry.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ProductionEntryRequest {

    private int productId;
    private int quantity;
    private int defectQuantity;
    private LocalDate receivedDate;

    // 필요한 경우 추가 메서드 작성 가능
}
