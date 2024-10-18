package com.ERP.FinalProject.domain.kiosk.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ERP.FinalProject.domain.kiosk.entity.Coffee;

public interface KioskCoffeeRepository {

	Page<Coffee> findByRecommend(String string, Pageable pageable);

}
