package com.ERP.FinalProject.domain.kiosk.repository;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.kiosk.entity.Coffee;

public interface KioskCoffeeRepository extends JpaRepository<Coffee, Long> {
    long countByRecommendAndOnKiosk(String recommend,String OnKisok);
	Page<Coffee> findByRecommendAndOnKiosk(String recommend,String OnKisok, Pageable pageable);
	Page<Coffee> findByRecommendAndTemperatureAndOnKiosk(String recommend, String temperature, String OnKiosk, Pageable pageable);
	Page<Coffee> findByOnKiosk(String string, Pageable pageable);
}
