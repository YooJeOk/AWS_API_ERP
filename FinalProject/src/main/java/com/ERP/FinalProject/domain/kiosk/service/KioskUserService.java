package com.ERP.FinalProject.domain.kiosk.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.kiosk.entity.UserStamp;
import com.ERP.FinalProject.domain.kiosk.repository.KioskUserStampRepository;

@Service
public class KioskUserService {
	@Autowired
	private KioskUserStampRepository repository;

	public UserStamp saveUserStamp(UserStamp userStamp) {
		return repository.save(userStamp);
	}

	public Optional<UserStamp> findByPhone(String phone) {
		return repository.findByPhone(phone);
	}

	public void incrementStampByPhone(String phone) {
		UserStamp userStamp = repository.findByPhone(phone)
				.orElseThrow(() -> new RuntimeException("폰 번호 없음: " + phone));

		userStamp.setStamp(userStamp.getStamp() + 1);
		repository.save(userStamp);
	}
}
