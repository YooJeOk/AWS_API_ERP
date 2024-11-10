package com.ERP.FinalProject.domain.production.MBOM.service;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOMDTO;
import com.ERP.FinalProject.domain.production.MBOM.repository.MBOMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
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
        mbom.setItemId(mbomData.getItemID().longValue());
        mbom.setItemType(mbomData.getItemType() != null ? mbomData.getItemType() : MBOM.ItemType.Product);
        
        if (mbomData.getSize() != null) {
            mbom.setSize(mbomData.getSize());
        } else if (mbomData.getItemType() == MBOM.ItemType.Coffee) {
            mbom.setSize(MBOM.Size.Regular);
        }

        mbom.setMaterialId(mbomData.getMaterialID().longValue());
        mbom.setProductName(mbomData.getProductName());
        mbom.setQuantity(mbomData.getQuantity());
        mbom.setUnit(mbomData.getUnit());
        mbom.setUnitPrice(mbomData.getUnitPrice());
        mbom.setTotalCost(mbomData.getTotalCost());
        mbomRepository.save(mbom);
    }

    public MBOM updateMBOM(int id, MBOM mbom) {
        if (mbomRepository.existsById(id)) {
            mbom.setBomId(id);
            return mbomRepository.save(mbom);
        }
        return null;
    }

    @Transactional
    public int deleteByProductName(String productName) {
        Integer itemId = mbomRepository.findItemIdByProductName(productName);
        if (itemId != null) {
            return mbomRepository.deleteByItemId(Long.valueOf(itemId));
        }
        return 0;
    }

    public Integer getNextItemID(MBOM.ItemType itemType, MBOM.Size size) {
        Integer lastItemID = mbomRepository.findMaxItemIDForTypeAndSize(itemType, size);
        return (lastItemID != null ? lastItemID + 1 : 1);
    }

    public boolean checkItemIdExists(int itemId) {
        return mbomRepository.existsByItemId(itemId);
    }
}
