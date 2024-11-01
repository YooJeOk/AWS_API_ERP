//package com.ERP.FinalProject.domain.inventory.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.ERP.FinalProject.domain.KioskManagement.repository.StoreInventoryRepository;
//
//@Service
//public class InventoryService {
//
//    @Autowired
//    private StoreInventoryRepository storeInventoryRepository;
//
//    @Autowired
//    private MBOMRepository mbomRepository;
//
//    @Autowired
//    private CoffeeOptionsRepository coffeeOptionsRepository;
//
//    @Transactional
//    public void updateInventory(List<CartItem> cartItems) {
//        for (CartItem item : cartItems) {
////            if ("bread".equals(item.getType())) {
//                updateBreadInventory(item);
//            } else if ("coffee".equals(item.getType())) {
//                updateCoffeeInventory(item);
//            }
//        }
//    }
//
//    private void updateBreadInventory(CartItem item) {
//        StoreInventory inventory = storeInventoryRepository.findByProductId(item.getProductId())
//                .orElseThrow(() -> new RuntimeException("Inventory not found for product"));
//        inventory.setQuantityInStore(inventory.getQuantityInStore() - item.getQuantity());
//        storeInventoryRepository.save(inventory);
//    }
//
//    private void updateCoffeeInventory(CartItem item) {
//        List<MBOM> recipes = mbomRepository.findByCoffeeIdAndSize(item.getCoffeeId(), item.getOptions().getSize());
//        for (MBOM recipe : recipes) {
//            StoreInventory inventory = storeInventoryRepository.findByMaterialId(recipe.getMaterialId())
//                    .orElseThrow(() -> new RuntimeException("Inventory not found for material"));
//            int consumedQuantity = recipe.getQuantity() * item.getQuantity();
//            inventory.setQuantityInStore(inventory.getQuantityInStore() - consumedQuantity);
//            storeInventoryRepository.save(inventory);
//        }
//
//        // 부가 옵션 처리
//        for (AdditionalOption option : item.getOptions().getAdditionalOptions()) {
//            CoffeeOptions coffeeOption = coffeeOptionsRepository.findById(option.getId())
//                    .orElseThrow(() -> new RuntimeException("Coffee option not found"));
//            StoreInventory inventory = storeInventoryRepository.findByMaterialId(coffeeOption.getMaterialId())
//                    .orElseThrow(() -> new RuntimeException("Inventory not found for option material"));
//            int consumedQuantity = coffeeOption.getQuantity() * option.getQuantity() * item.getQuantity();
//            inventory.setQuantityInStore(inventory.getQuantityInStore() - consumedQuantity);
//            storeInventoryRepository.save(inventory);
//        }
//    }
//}