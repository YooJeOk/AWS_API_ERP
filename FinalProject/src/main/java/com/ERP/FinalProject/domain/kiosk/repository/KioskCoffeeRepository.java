package com.ERP.FinalProject.domain.kiosk.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.kiosk.entity.Coffee;

public interface KioskCoffeeRepository extends JpaRepository<Coffee, Long>{

}
