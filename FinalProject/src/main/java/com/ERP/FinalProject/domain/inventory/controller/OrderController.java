package com.ERP.FinalProject.domain.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ERP.FinalProject.domain.inventory.dto.OrderDTO;
import com.ERP.FinalProject.domain.inventory.entity.Order;
import com.ERP.FinalProject.domain.inventory.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/manual")
    public ResponseEntity<Order> createManualOrder(@RequestBody OrderDTO orderDTO) {
        Order createdOrder = orderService.createManualOrder(orderDTO);
        return ResponseEntity.ok(createdOrder);
    }
    
    @GetMapping("/pending")
    public ResponseEntity<Page<Order>> getPendingOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Order> pendingOrders = orderService.getPendingOrders(pageRequest);
        return ResponseEntity.ok(pendingOrders);
    }

    @GetMapping("/completed")
    public ResponseEntity<Page<Order>> getCompletedOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Order> completedOrders = orderService.getCompletedOrders(pageRequest);
        return ResponseEntity.ok(completedOrders);
    }

    @PostMapping("/complete")
    public ResponseEntity<String> completeOrders(@RequestBody List<Long> orderIds) {
        orderService.completeOrders(orderIds);
        return ResponseEntity.ok("Orders marked as completed");
    }
}