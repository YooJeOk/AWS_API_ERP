package com.ERP.FinalProject.domain.production.MBOM.controller;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM.ItemType;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM.Size;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOMDTO;
import com.ERP.FinalProject.domain.production.MBOM.service.MBOMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/mbom")
public class MBOMController {

    private final MBOMService mbomService;

    @Autowired
    public MBOMController(MBOMService mbomService) {
        this.mbomService = mbomService;
    }

    @GetMapping("/all")
    public List<MBOM> getAllMBOMs() {
        return mbomService.getAllMBOMs();
    }

    @GetMapping("/all-with-material-name")
    public List<MBOMDTO> getAllMBOMDTOs() {
        return mbomService.getAllMBOMDTOs();
    }

    @GetMapping("/{itemid}")
    public ResponseEntity<MBOM> getMBOMById(@PathVariable int id) {
        Optional<MBOM> mbom = mbomService.getMBOMById(id);
        return mbom.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PutMapping("/update/{itemid}")
    public ResponseEntity<MBOM> updateMBOM(@PathVariable int id, @RequestBody MBOM mbom) {
        MBOM updatedMBOM = mbomService.updateMBOM(id, mbom);
        if (updatedMBOM != null) {
            return ResponseEntity.ok(updatedMBOM);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/delete-by-product-name")
    public ResponseEntity<String> deleteByProductName(@RequestBody Map<String, String> request) {
        String productName = request.get("productName");

        if (productName == null || productName.isEmpty()) {
            return ResponseEntity.badRequest().body("상품 이름이 필요합니다.");
        }

        try {
            int deletedCount = mbomService.deleteByProductName(productName);
            return ResponseEntity.ok(deletedCount + "개의 항목이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패: " + e.getMessage());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveMBOM(@RequestBody MBOMDTO mbomDTO) {
        try {
            mbomService.saveMBOM(mbomDTO);
            return ResponseEntity.ok("MBOM saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error saving MBOM: " + e.getMessage());
        }
    }

    @GetMapping("/next-item-id")
    public ResponseEntity<Integer> getNextItemID(
            @RequestParam("itemType") ItemType itemType,
            @RequestParam("size") Size size) {
        Integer nextItemID = mbomService.getNextItemID(itemType, size);
        return ResponseEntity.ok(nextItemID);
    }

    @GetMapping("/check-item-id/{itemId}")
    public ResponseEntity<Map<String, Boolean>> checkItemIdExists(@PathVariable int itemId) {
        boolean exists = mbomService.checkItemIdExists(itemId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
}
