package com.ERP.FinalProject.domain.inventory.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.KioskManagement.entity.StoreInventory;
import com.ERP.FinalProject.domain.KioskManagement.repository.StoreInventoryRepository;
import com.ERP.FinalProject.domain.kiosk.entity.CoffeeOption;
import com.ERP.FinalProject.domain.kiosk.repository.CoffeeOptionsRepository;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.repository.MBOMRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InventoryService {

    @Autowired
    private StoreInventoryRepository storeInventoryRepository;

    @Autowired
    private MBOMRepository mbomRepository;

    @Autowired
    private CoffeeOptionsRepository coffeeOptionsRepository;

    @Transactional
    public void updateInventory(List<Map<String, Object>> cartItems) {
        for (Map<String, Object> item : cartItems) {
            String type = (String) item.get("type");
            int quantity = ((Number) item.get("quantity")).intValue();
            System.out.println("타입:" + type);
            System.out.println("양:" + quantity);
            if ("bread".equals(type)) {
                Long productId = ((Number) item.get("id")).longValue();
                updateBreadInventory(productId, quantity);
            } else if ("coffee".equals(type)) {
                Long coffeeId = ((Number) item.get("id")).longValue();
                updateCoffeeInventory(coffeeId, (Map<String, Object>) item.get("options"), quantity);
            }
        }
    }

    private void updateBreadInventory(Long productId, int quantity) {
        StoreInventory inventory = storeInventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Inventory not found for product: " + productId));
        System.out.println("인벤토리:" + inventory);
        inventory.setQuantityInStore(inventory.getQuantityInStore() - quantity);
        storeInventoryRepository.save(inventory);
    }

    private void updateCoffeeInventory(Long coffeeId, Map<String, Object> options, int quantity) {
    	  String sizeStr = (String) options.get("size");
    	    MBOM.Size size;
        try {
            size = MBOM.Size.valueOf(sizeStr);
        } catch (IllegalArgumentException e) {
            // 대소문자를 구분하지 않고 일치하는 열거형 값을 찾습니다.
            size = Arrays.stream(MBOM.Size.values())
                         .filter(s -> s.name().equalsIgnoreCase(sizeStr))
                         .findFirst()
                         .orElseThrow(() -> new IllegalArgumentException("Invalid size: " + sizeStr));
        }
        
        List<MBOM> recipes = mbomRepository.findByItemIdAndItemTypeAndSize(coffeeId, MBOM.ItemType.Coffee, size);
        
               
        for (MBOM recipe : recipes) {
            List<StoreInventory> inventories = storeInventoryRepository.findAllByMaterialId(recipe.getMaterialId());
            log.info("Found {} inventory items for MaterialId: {}", inventories.size(), recipe.getMaterialId());
            
            if (inventories.isEmpty()) {
                log.warn("Inventory not found for material: {}. Skipping this material.", recipe.getMaterialId());
                continue;  
            }
            
            StoreInventory inventory = inventories.get(0);
            int consumedQuantity = recipe.getQuantity() * quantity;
            inventory.setQuantityInStore(inventory.getQuantityInStore() - consumedQuantity);
            storeInventoryRepository.save(inventory);
        }

        // 추가 옵션 처리
        List<Map<String, Object>> additionalOptions = (List<Map<String, Object>>) options.get("additionalOptions");
        if (additionalOptions != null) {
            for (Map<String, Object> option : additionalOptions) {
                Long optionId = ((Number) option.get("id")).longValue();
                int optionQuantity = ((Number) option.get("quantity")).intValue();
                
                CoffeeOption coffeeOption = coffeeOptionsRepository.findById(optionId)
                    .orElseThrow(() -> new RuntimeException("Coffee option not found: " + optionId));
                
                List<StoreInventory> inventories = storeInventoryRepository.findAllByMaterialId(coffeeOption.getMaterialId());
                if (inventories.isEmpty()) {
                    log.warn("Inventory not found for additional option: {}. Skipping this option.", coffeeOption.getMaterialId());
                    continue;  
                }
                
                StoreInventory inventory = inventories.get(0);
                int consumedQuantity = coffeeOption.getQuantity() * optionQuantity * quantity;
                inventory.setQuantityInStore(inventory.getQuantityInStore() - consumedQuantity);
                storeInventoryRepository.save(inventory);
            }
        }
    }
}