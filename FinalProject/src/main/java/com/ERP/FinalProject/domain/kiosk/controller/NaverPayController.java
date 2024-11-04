package com.ERP.FinalProject.domain.kiosk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment/naver")
public class NaverPayController {

	  @PostMapping("/complete")
	    public ResponseEntity<?> completePayment() {
	        return ResponseEntity.ok().body("네이버페이 결제 완료");
	    }
}