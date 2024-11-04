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
            
            if (order.getProductId() != null) {
                updateInventory(order.getProductId(), order.getQuantity(), true);
            } else if (order.getMaterialId() != null) {
                updateInventory(order.getMaterialId(), order.getQuantity(), false);
            }
        }
        orderRepository.saveAll(orders);
    }

    private void updateInventory(Long itemId, int quantity, boolean isProduct) {
        if (isProduct) {
            FactoryInventory factoryInventory = factoryInventoryRepository.findByProductId(itemId)
                .orElseThrow(() -> new RuntimeException("Factory inventory not found for product: " + itemId));
            factoryInventory.setQuantityInFactory(factoryInventory.getQuantityInFactory() - quantity);
            factoryInventoryRepository.save(factoryInventory);
            
            StoreInventory storeInventory = storeInventoryRepository.findByProductId(itemId)
                .orElse(new StoreInventory());
            storeInventory.setProductId(itemId);
            storeInventory.setQuantityInStore(storeInventory.getQuantityInStore() + quantity);
            storeInventory.setStoreDate(LocalDateTime.now());
            storeInventoryRepository.save(storeInventory);
        } else {
            FactoryInventory factoryInventory = factoryInventoryRepository.findByMaterialId(itemId)
                .orElseThrow(() -> new RuntimeException("Factory inventory not found for material: " + itemId));
            factoryInventory.setQuantityInFactory(factoryInventory.getQuantityInFactory() - quantity);
            factoryInventoryRepository.save(factoryInventory);
            
            StoreInventory storeInventory = storeInventoryRepository.findByMaterialId(itemId)
                .orElse(new StoreInventory());
            storeInventory.setMaterialId(itemId);
            storeInventory.setQuantityInStore(storeInventory.getQuantityInStore() + quantity);
            storeInventory.setStoreDate(LocalDateTime.now());
            storeInventoryRepository.save(storeInventory);
        }
    }
}