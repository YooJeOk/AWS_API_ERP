package com.ERP.FinalProject.domain.production.MBOM.service;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM.ItemType;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM.Size;
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

    public List<MBOM> getAllMBOMs() {
        return mbomRepository.findAll();
    }

    public List<MBOMDTO> getAllMBOMDTOs() {
        return mbomRepository.findAllWithMaterialName();
    }

    public Optional<MBOM> getMBOMById(int id) {
        return mbomRepository.findById(id);
    }

    public void saveMBOM(MBOMDTO mbomData) {
        MBOM mbom = new MBOM();
        mbom.setItemId(mbomData.getItemID());
        
        // Enum 값 매핑 및 null 체크
        if (mbomData.getItemType() != null) {
            mbom.setItemType(mbomData.getItemType());
        } else {
            mbom.setItemType(ItemType.Product);  // 기본값 설정
        }

        if (mbomData.getSize() != null) {
            mbom.setSize(mbomData.getSize());
        } else if (mbomData.getItemType() == ItemType.Coffee) {
            mbom.setSize(Size.Regular);  // Coffee의 경우 기본값 설정
        }

        mbom.setMaterialId(mbomData.getMaterialID());
        mbom.setProductName(mbomData.getProductName());
        mbom.setQuantity(mbomData.getQuantity());
        mbom.setUnit(mbomData.getUnit());
        mbom.setUnitPrice(mbomData.getUnitPrice());
        mbom.setTotalCost(mbomData.getTotalCost());

        // 저장
        mbomRepository.save(mbom);
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
            System.out.println("삭제하려는 MBOM ID가 존재하지 않습니다: " + id);
        }
    }

    // 다음 ItemID 계산 (새로운 메서드 호출)
    public Integer getNextItemID(ItemType itemType, Size size) {
        Integer lastItemID = mbomRepository.findMaxItemIDForTypeAndSize(itemType, size);
        return (lastItemID != null ? lastItemID + 1 : 1);
    }
}
