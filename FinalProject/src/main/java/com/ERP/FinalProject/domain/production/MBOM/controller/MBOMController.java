package com.ERP.FinalProject.domain.production.MBOM.controller;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOMDTO;
import com.ERP.FinalProject.domain.production.MBOM.service.MBOMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mbom")
public class MBOMController {

    private final MBOMService mbomService;

    @Autowired
    public MBOMController(MBOMService mbomService) {
        this.mbomService = mbomService;
    }

    // 모든 MBOM 항목을 가져오는 엔드포인트
    @GetMapping("/all")
    public List<MBOM> getAllMBOMs() {
        return mbomService.getAllMBOMs();
    }

    // materialName을 포함한 모든 MBOMDTO 항목을 가져오는 엔드포인트
    @GetMapping("/all-with-material-name")
    public List<MBOMDTO> getAllMBOMDTOs() {
        return mbomService.getAllMBOMDTOs();
    }

    // 특정 ID의 MBOM 가져오기
    @GetMapping("/{id}")
    public ResponseEntity<MBOM> getMBOMById(@PathVariable int id) {
        Optional<MBOM> mbom = mbomService.getMBOMById(id);
        return mbom.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // 특정 MBOM 업데이트
    @PutMapping("/update/{id}")
    public ResponseEntity<MBOM> updateMBOM(@PathVariable int id, @RequestBody MBOM mbom) {
        MBOM updatedMBOM = mbomService.updateMBOM(id, mbom);
        if (updatedMBOM != null) {
            return ResponseEntity.ok(updatedMBOM);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 특정 MBOM 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMBOM(@PathVariable int id) {
        try {
            mbomService.deleteMBOM(id);
            return ResponseEntity.ok("Deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error deleting: " + e.getMessage());
        }
    }
}
