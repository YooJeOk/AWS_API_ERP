package com.ERP.FinalProject.domain.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ERP.FinalProject.domain.KioskManagement.entity.StoreInventory;
import com.ERP.FinalProject.domain.KioskManagement.repository.StoreInventoryRepository;
import com.ERP.FinalProject.domain.inventory.entity.MaterialsInventory;
import com.ERP.FinalProject.domain.inventory.entity.Order;
import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.inventory.repository.MaterialsInventoryRepository;
import com.ERP.FinalProject.domain.inventory.repository.OrderRepository;
import com.ERP.FinalProject.domain.kiosk.repository.KioskProductRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AutoOrderService {

    @Autowired
    private KioskProductRepository productRepository;

    @Autowired
    private MaterialsInventoryRepository materialRepository;

    @Autowired
    private StoreInventoryRepository storeInventoryRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public void checkAndCreateAutoOrders() {
        checkProductsForAutoOrder();
        checkMaterialsForAutoOrder();
    }

    private void checkProductsForAutoOrder() {
        List<Product> autoOrderProducts = productRepository.findByAutoOrder("Y");
        for (Product product : autoOrderProducts) {
            Optional<StoreInventory> storeInventoryOpt = storeInventoryRepository.findByProductId(product.getProductId());
            if (storeInventoryOpt.isPresent()) {
                StoreInventory storeInventory = storeInventoryOpt.get();
                if (storeInventory.getQuantityInStore() < product.getMinimumStock()) {
                    createAutoOrder(product, "제품");
                }
            }
        }
    }

    private void checkMaterialsForAutoOrder() {
        List<MaterialsInventory> autoOrderMaterials = materialRepository.findByAutoOrder("Y");
        for (MaterialsInventory material : autoOrderMaterials) {
            Optional<StoreInventory> storeInventoryOpt = storeInventoryRepository.findByMaterialId(material.getMaterialId());
            if (storeInventoryOpt.isPresent()) {
                StoreInventory storeInventory = storeInventoryOpt.get();
                if (storeInventory.getQuantityInStore() < material.getMinimumStock()) {
                    createAutoOrder(material, "자재");
                }
            }
        }
    }

    private void createAutoOrder(Object item, String category) {
        Order order = new Order();
        order.setCategory(category);
        order.setProductName(category.equals("제품") ? ((Product)item).getProductName() : ((MaterialsInventory)item).getMaterialName());
        order.setQuantity(category.equals("제품") ? ((Product)item).getAutoOrderQauntity() : ((MaterialsInventory)item).getAutoOrderQauntity());
        order.setUnit(category.equals("제품") ? "개" : ((MaterialsInventory)item).getUnit());
        order.setOrderType("자동발주");
        order.setOrderStatus("미처리");
        order.setOrderDate(LocalDateTime.now());

        orderRepository.save(order);
    }

    public void updateAutoOrderSetting(Long itemId, String category, String autoOrder, Integer autoOrderQuantity) {
        if ("제품".equals(category)) {
            Product product = productRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Product not found"));
            product.setAutoOrder(autoOrder);
            product.setAutoOrderQauntity(autoOrderQuantity);
            productRepository.save(product);
        } else if ("자재".equals(category)) {
            MaterialsInventory material = materialRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Material not found"));
            material.setAutoOrder(autoOrder);
            material.setAutoOrderQauntity(autoOrderQuantity);
            materialRepository.save(material);
        }
    }
}