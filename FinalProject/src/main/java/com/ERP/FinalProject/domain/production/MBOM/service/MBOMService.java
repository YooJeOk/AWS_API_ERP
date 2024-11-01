package com.ERP.FinalProject.domain.production.MBOM.service;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOMDTO;
import com.ERP.FinalProject.domain.production.MBOM.repository.MBOMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MBOMService {

    private final MBOMRepository mbomRepository;

    @Autowired
    public MBOMService(MBOMRepository mbomRepository) {
        this.mbomRepository = mbomRepository;
    }

    // 기본 MBOM 엔티티 리스트 반환
    public List<MBOM> getAllMBOMs() {
        return mbomRepository.findAll();
    }

    // MBOMDTO 리스트 반환 (materialName 포함)
    public List<MBOMDTO> getAllMBOMDTOs() {
        return mbomRepository.findAllWithMaterialName();
    }

    public Optional<MBOM> getMBOMById(int id) {
        return mbomRepository.findById(id);
    }

    public MBOM addMBOM(MBOM mbom) {
        return mbomRepository.save(mbom);
    }

    public MBOM updateMBOM(int id, MBOM mbom) {
        if (mbomRepository.existsById(id)) {
            mbom.setBomId(id);
            return mbomRepository.save(mbom);
        }
        return null;
    }

    public void deleteMBOM(int id) {
        try {
            mbomRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            // 존재하지 않는 ID로 인한 예외를 무시하거나 로그를 기록할 수 있습니다.
            System.out.println("삭제하려는 MBOM ID가 존재하지 않습니다: " + id);
        }
    }
}
