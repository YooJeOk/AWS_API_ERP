package com.ERP.FinalProject.domain.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.KioskManagement.entity.StoreInventory;
import com.ERP.FinalProject.domain.KioskManagement.repository.StoreInventoryRepository;
import com.ERP.FinalProject.domain.inventory.dto.OrderDTO;
import com.ERP.FinalProject.domain.inventory.entity.FactoryInventory;
import com.ERP.FinalProject.domain.inventory.entity.Order;
import com.ERP.FinalProject.domain.inventory.repository.FactoryInventoryRepository;
import com.ERP.FinalProject.domain.inventory.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FactoryInventoryRepository factoryInventoryRepository;

    @Autowired
    private StoreInventoryRepository storeInventoryRepository;

    
    public Order createManualOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setCategory(orderDTO.getCategory());
        order.setProductName(orderDTO.getProductName());
        order.setQuantity(orderDTO.getQuantity());
        order.setUnit(orderDTO.getUnit());
        order.setOrderType("수동입력");
        order.setOrderStatus("미처리");
        order.setOrderDate(LocalDateTime.now());
        order.setProductId(orderDTO.getProductId());
        order.setMaterialId(orderDTO.getMaterialId());

        return orderRepository.save(order);
    }

    public Page<Order> getPendingOrders(Pageable pageable) {
        return orderRepository.findByOrderStatus("미처리", pageable);
    }

    public Page<Order> getCompletedOrders(Pageable pageable) {
        return orderRepository.findByOrderStatus("처리 완료", pageable);
    }


    @Transactional
    public void completeOrders(List<Long> orderIds) {
        List<Order> orders = orderRepository.findAllById(orderIds);
        for (Order order : orders) {
            order.setOrderStatus("처리 완료");
            order.setCompletedDate(LocalDateTime.now());
            
            FactoryInventory factoryInventory = factoryInventoryRepository.findByProductIdOrMaterialId(order.getProductId(), order.getMaterialId())
                .orElseThrow(() -> new RuntimeException("Factory inventory not found"));
            factoryInventory.setQuantityInFactory(factoryInventory.getQuantityInFactory() - order.getQuantity());
            factoryInventoryRepository.save(factoryInventory);
            
            StoreInventory storeInventory = storeInventoryRepository.findByProductIdOrMaterialId(order.getProductId(), order.getMaterialId())
                .orElse(new StoreInventory());
            storeInventory.setProductId(order.getProductId());
            storeInventory.setMaterialId(order.getMaterialId());
            storeInventory.setQuantityInStore(storeInventory.getQuantityInStore() + order.getQuantity());
            storeInventory.setStoreDate(LocalDateTime.now());
            storeInventoryRepository.save(storeInventory);
        }
        orderRepository.saveAll(orders);
    }
}