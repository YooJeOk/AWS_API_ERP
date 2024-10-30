package com.ERP.FinalProject.domain.SalesManagement.Entity;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "SalesManagementSalesRecord")
@Table(name = "SalesRecords", schema = "ERP")
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

    @OneToMany(mappedBy = "salesRecord", cascade = CascadeType.ALL, fetch = FetchType.EAGER) // 즉시 로딩 설정
    private List<SalesDetail> salesDetails;
}
