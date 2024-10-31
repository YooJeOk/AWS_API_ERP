package com.ERP.FinalProject.domain.production.MBOM.controller;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.service.MBOMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    

    // 특정 MBOM을 업데이트하는 엔드포인트
    @PutMapping("/update/{id}")
    public MBOM updateMBOM(@PathVariable int id, @RequestBody MBOM mbom) {
        return mbomService.updateMBOM(id, mbom);
    }

    // 특정 MBOM을 삭제하는 엔드포인트
    @DeleteMapping("/delete/{id}")
    public String deleteMBOM(@PathVariable int id) {
        mbomService.deleteMBOM(id);
        return "Deleted successfully";
    }
}
