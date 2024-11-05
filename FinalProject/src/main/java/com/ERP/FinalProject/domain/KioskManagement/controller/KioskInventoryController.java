package com.ERP.FinalProject.domain.KioskManagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ERP.FinalProject.domain.KioskManagement.service.KioskInventoryService;
import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.kiosk.entity.Coffee;

@RestController
@RequestMapping("/api/kiosk/inventory")
public class KioskInventoryController {

	@Autowired
	private KioskInventoryService kioskInventoryService;
	
	@GetMapping("/products")
    public ResponseEntity<Map<String, Object>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String search) {
        Page<Product> productPage = kioskInventoryService.getProducts(page, size, search);
        List<Map<String, Object>> products = productPage.getContent().stream().map(product -> {
            Map<String, Object> productMap = new HashMap<>();
            productMap.put("product", product);
            productMap.put("inventory", kioskInventoryService.getProductInventory(product));
            return productMap;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("products", products);
        response.put("currentPage", productPage.getNumber());
        response.put("totalItems", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/coffees")
    public ResponseEntity<Map<String, Object>> getCoffees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String search) {
        Page<Coffee> coffeePage = kioskInventoryService.getCoffees(page, size, search);

        Map<String, Object> response = new HashMap<>();
        response.put("coffees", coffeePage.getContent());
        response.put("currentPage", coffeePage.getNumber());
        response.put("totalItems", coffeePage.getTotalElements());
        response.put("totalPages", coffeePage.getTotalPages());

        return ResponseEntity.ok(response);
    }
	
	//키오스크에 없는 빵들
	@GetMapping("/register/product")
	public ResponseEntity<Map<String, Object>> getNoKioskProducts(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size) {
		Page<Product> productPage = kioskInventoryService.getNoKioskProducts(page, size);
		List<Map<String, Object>> products = productPage.getContent().stream().map(product -> {
			Map<String, Object> productMap = new HashMap<>();
			productMap.put("product", product);
			productMap.put("inventory", kioskInventoryService.getProductInventory(product));
			return productMap;
		}).collect(Collectors.toList());

		Map<String, Object> response = new HashMap<>();
		response.put("products", products);
		response.put("currentPage", productPage.getNumber());
		response.put("totalItems", productPage.getTotalElements());
		response.put("totalPages", productPage.getTotalPages());

		return ResponseEntity.ok(response);
	}
	@GetMapping("/register/coffee")
	public ResponseEntity<Map<String, Object>> getNoKioskCoffees(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size){
		
		Page<Coffee> coffeePage = kioskInventoryService.getNoKioskCoffees(page, size);
		
		Map<String, Object> response = new HashMap<>();
		response.put("coffees", coffeePage.getContent());
		response.put("currentPage", coffeePage.getNumber());
		response.put("totalItems", coffeePage.getTotalElements());
		response.put("totalPages", coffeePage.getTotalPages());

		return ResponseEntity.ok(response);
	}
	
	
	
    @PutMapping("/update/products")
    public ResponseEntity<?> updateProducts(@RequestBody List<Product> products) {
        kioskInventoryService.updateProducts(products);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/coffees")
    public ResponseEntity<?> updateCoffees(@RequestBody List<Coffee> coffees) {
        kioskInventoryService.updateCoffees(coffees);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/products/{productId}/update/downkiosk")
    public ResponseEntity<?> updateProductDownKiosk(@PathVariable Long productId, @RequestBody Map<String, String> body) {
        kioskInventoryService.updateProductDownKiosk(productId, body.get("OnKiosk"));
        return ResponseEntity.ok().build();
    }

    @PutMapping("/coffees/{coffeeId}/update/downkiosk")
    public ResponseEntity<?> updateCoffeeDownKiosk(@PathVariable Long coffeeId, @RequestBody Map<String, String> body) {
        kioskInventoryService.updateCoffeeDownKiosk(coffeeId, body.get("OnKiosk"));
        return ResponseEntity.ok().build();
    }   
    
    
    
    @PutMapping("/products/{productId}/update/onkiosk")
    public ResponseEntity<?> updateProductOnKiosk(@PathVariable Long productId, @RequestBody Map<String, String> body) {
    	kioskInventoryService.updateProductOnKiosk(productId, body.get("OnKiosk"));
        return ResponseEntity.ok().build();
    }

    @PutMapping("/coffees/{coffeeId}/update/onkiosk")
    public ResponseEntity<?> updateCoffeeOnKiosk(@PathVariable Long coffeeId, @RequestBody Map<String, String> body) {
    	kioskInventoryService.updateCoffeeOnKiosk(coffeeId, body.get("OnKiosk"));
        return ResponseEntity.ok().build();
    }
}