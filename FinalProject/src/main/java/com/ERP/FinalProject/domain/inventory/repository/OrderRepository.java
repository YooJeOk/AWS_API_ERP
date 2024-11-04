package com.ERP.FinalProject.domain.inventory.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ERP.FinalProject.domain.inventory.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByOrderStatus(String orderStatus, Pageable pageable);
    
    List<Order> findByOrderStatus(String orderStatus);


}