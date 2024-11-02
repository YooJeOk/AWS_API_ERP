package com.ERP.FinalProject.domain.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.inventory.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}