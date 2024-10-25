package com.ERP.FinalProject.domain.kiosk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.kiosk.entity.CoffeeOptionSalesDetail;
import com.ERP.FinalProject.domain.kiosk.entity.SalesDetail;
import com.ERP.FinalProject.domain.kiosk.entity.SalesRecord;
import com.ERP.FinalProject.domain.kiosk.repository.CoffeeOptionSalesDetailsRepository;
import com.ERP.FinalProject.domain.kiosk.repository.SalesDetailsRepository;
import com.ERP.FinalProject.domain.kiosk.repository.SalesRecordsRepository;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

@Service
public class SalesRecordsService {

	@Autowired
	private SalesRecordsRepository salesRecordsRepository;

	@Autowired
	private SalesDetailsRepository salesDetailsRepository;

	@Autowired
	private CoffeeOptionSalesDetailsRepository coffeeOptionSalesDetailsRepository;

	 @Transactional
	    public SalesRecord saveSalesRecord(SalesRecord salesRecord) {
	        return salesRecordsRepository.save(salesRecord);
	   }
}
