package com.ERP.FinalProject.domain.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.inventory.entity.Order;
import com.ERP.FinalProject.domain.inventory.repository.OrderRepository;

import java.time.LocalDateTime;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        order.setOrderType("수동입력");
        order.setOrderStatus("미처리");
        order.setOrderDate(LocalDateTime.now());
        return orderRepository.save(order);
    }
}