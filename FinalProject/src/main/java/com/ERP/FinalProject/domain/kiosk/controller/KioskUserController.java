package com.ERP.FinalProject.domain.kiosk.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ERP.FinalProject.domain.kiosk.entity.UserStamp;
import com.ERP.FinalProject.domain.kiosk.service.KioskUserService;

@RestController
@RequestMapping("/api/user")
public class KioskUserController {

	@Autowired
	private KioskUserService service;

	@PostMapping("/join")
	public ResponseEntity<UserStamp> createUserStamp(@RequestBody UserStamp userStamp) {
		UserStamp savedUser = service.saveUserStamp(userStamp);
		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}

	@GetMapping("/{phone}")
	public ResponseEntity<UserStamp> getUserRewardByPhone(@PathVariable String phone) {
		Optional<UserStamp> userReward = service.findByPhone(phone);
		return userReward.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

}
