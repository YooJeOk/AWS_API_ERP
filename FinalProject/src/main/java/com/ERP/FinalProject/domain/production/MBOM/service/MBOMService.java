package com.ERP.FinalProject.domain.production.MBOM.service;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.repository.MBOMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MBOMService {

    private final MBOMRepository mbomRepository;

    @Autowired
    public MBOMService(MBOMRepository mbomRepository) {
        this.mbomRepository = mbomRepository;
    }

    public List<MBOM> getAllMBOMs() {
        return mbomRepository.findAll();
    }

    public MBOM getMBOMById(int id) {
        return mbomRepository.findById(id).orElse(null);
    }

    public MBOM addMBOM(MBOM mbom) {
        return mbomRepository.save(mbom);
    }

    public MBOM updateMBOM(int id, MBOM mbom) {
        if (mbomRepository.existsById(id)) {
            mbom.setBOMID(id);
            return mbomRepository.save(mbom);
        }
        return null;
    }

    public void deleteMBOM(int id) {
        mbomRepository.deleteById(id);
    }

    
}