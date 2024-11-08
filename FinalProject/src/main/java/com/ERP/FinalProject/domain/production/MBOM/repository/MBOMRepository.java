package com.ERP.FinalProject.domain.production.MBOM.repository;

import com.ERP.FinalProject.domain.production.MBOM.entity.MBOM;
import com.ERP.FinalProject.domain.production.MBOM.entity.MBOMDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MBOMRepository extends JpaRepository<MBOM, Integer> {

    @Query("SELECT new com.ERP.FinalProject.domain.production.MBOM.entity.MBOMDTO(" +
           "mb.bomId, mb.itemId, mb.itemType, mb.size, mb.materialId, m.materialName, " +
           "mb.productName, mb.quantity, mb.unit, mb.unitPrice, mb.totalCost) " +
           "FROM MBOM mb " +
           "JOIN MaterialsInventory m ON mb.materialId = m.materialId")
    List<MBOMDTO> findAllWithMaterialName();

    List<MBOM> findByItemIdAndItemTypeAndSize(Long itemId, MBOM.ItemType itemType, MBOM.Size size);

    @Query("SELECT MAX(m.itemId) FROM MBOM m WHERE m.itemType = :itemType AND m.size = :size")
    Integer findMaxItemIDForTypeAndSize(@Param("itemType") MBOM.ItemType itemType, @Param("size") MBOM.Size size);

    // 새로운 저장용 쿼리 추가
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO ERP.MBOM (ItemID, ItemType, Size, MaterialID, ProductName, Quantity, Unit, UnitPrice, TotalCost) " +
                   "VALUES (:itemId, :itemType, :size, :materialId, :productName, :quantity, :unit, :unitPrice, :totalCost)", nativeQuery = true)
    int saveMBOM(@Param("itemId") Long itemId, 
                 @Param("itemType") String itemType, 
                 @Param("size") String size, 
                 @Param("materialId") Long materialId, 
                 @Param("productName") String productName, 
                 @Param("quantity") int quantity, 
                 @Param("unit") String unit, 
                 @Param("unitPrice") float unitPrice, 
                 @Param("totalCost") int totalCost);
    
    
    @Query("SELECT m.itemId FROM MBOM m WHERE m.productName = :productName")
    Integer findItemIdByProductName(String productName);
 // MBOMRepository.java
    @Modifying
    @Query("DELETE FROM MBOM m WHERE m.itemId = :itemId")
    int deleteByItemId(@Param("itemId") Long itemId);
    
    boolean existsByItemId(int itemId);
  
}
