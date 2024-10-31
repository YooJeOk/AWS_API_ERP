package com.ERP.FinalProject.domain.SalesManagement.Service;

import com.ERP.FinalProject.domain.SalesManagement.Entity.SalesDetail;
import com.ERP.FinalProject.domain.SalesManagement.Repository.SalesDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesDetailService {

    private final SalesDetailRepository salesDetailRepository;

    @Autowired
    public SalesDetailService(SalesDetailRepository salesDetailRepository) {
        this.salesDetailRepository = salesDetailRepository;
    }

    public List<SalesDetail> getSalesDetailsBySaleID(Long saleID) {
        return salesDetailRepository.findAll();  // Customize this query to match the details needed by saleID
    }
}
