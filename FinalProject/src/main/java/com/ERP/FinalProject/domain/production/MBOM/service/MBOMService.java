package com.ERP.FinalProject.domain.production.MBOM.service;

import com.ERP.FinalProject.domain.production.MBOM.entitiy.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.entitiy.MBOMEntry;
import com.ERP.FinalProject.domain.production.MBOM.repository.MBOMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MBOMService {

    @Autowired
    private MBOMRepository mbomRepository;

    public MBOM saveMBOM(MBOMEntry mbomEntry) {
        MBOM mbom = new MBOM();
        mbom.setItemId(mbomEntry.getItemId());
        mbom.setItemType(mbomEntry.getItemType());
        mbom.setSize(mbomEntry.getSize());
        mbom.setMaterialId(mbomEntry.getMaterialId());
        mbom.setProductName(mbomEntry.getProductName());
        mbom.setQuantity(mbomEntry.getQuantity());
        mbom.setUnit(mbomEntry.getUnit());
        mbom.setUnitPrice(mbomEntry.getUnitPrice());
        mbom.setTotalCost(mbomEntry.getTotalCost());
        
        return mbomRepository.save(mbom);
    }
}
