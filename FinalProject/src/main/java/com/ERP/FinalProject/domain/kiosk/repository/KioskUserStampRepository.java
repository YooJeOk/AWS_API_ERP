package com.ERP.FinalProject.domain.kiosk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.kiosk.entity.UserStamp;

public interface KioskUserStampRepository extends JpaRepository<UserStamp, Long>{

	Optional<UserStamp> findByPhone(String phone);

}
