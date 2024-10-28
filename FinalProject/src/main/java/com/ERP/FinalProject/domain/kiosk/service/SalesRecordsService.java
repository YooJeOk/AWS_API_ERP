package com.ERP.FinalProject.domain.kiosk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.ERP.FinalProject.domain.kiosk.entity.SalesRecord;

import com.ERP.FinalProject.domain.kiosk.repository.SalesRecordsRepository;



import javax.transaction.Transactional;

@Service
public class SalesRecordsService {

	@Autowired
	private SalesRecordsRepository salesRecordsRepository;

	;

	

	 @Transactional
	    public SalesRecord saveSalesRecord(SalesRecord salesRecord) {
	        return salesRecordsRepository.save(salesRecord);
	   }
}
