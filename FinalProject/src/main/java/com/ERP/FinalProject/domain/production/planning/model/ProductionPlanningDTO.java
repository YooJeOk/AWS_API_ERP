package com.ERP.FinalProject.domain.production.planning.model;

public class ProductionPlanningDTO {
    private int orderId;
    private int productId;
    private String startDate;
    private String endDate;
    private int plannedQuantity;
    private int materialId;
    private String materialName;
    private double requiredMaterialQty;
    private double materialCost;
    private double totalMrpCost;
    private String etc; // 기타 필드

    // 모든 필드를 포함하는 생성자
    public ProductionPlanningDTO(int orderId, int productId, String startDate, String endDate, int plannedQuantity,
                                 int materialId, String materialName, double requiredMaterialQty,
                                 double materialCost, double totalMrpCost, String etc) {
        this.orderId = orderId;
        this.productId = productId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.plannedQuantity = plannedQuantity;
        this.materialId = materialId;
        this.materialName = materialName;
        this.requiredMaterialQty = requiredMaterialQty;
        this.materialCost = materialCost;
        this.totalMrpCost = totalMrpCost;
        this.etc = etc;
    }

    // Getters and Setters
    public int getOrderId() { return orderId; }
    public int getProductId() { return productId; }
    public String getStartDate() { return startDate; }
    public String getEndDate() { return endDate; }
    public int getPlannedQuantity() { return plannedQuantity; }
    public int getMaterialId() { return materialId; }
    public String getMaterialName() { return materialName; }
    public double getRequiredMaterialQty() { return requiredMaterialQty; }
    public double getMaterialCost() { return materialCost; }
    public double getTotalMrpCost() { return totalMrpCost; }
    public String getEtc() { return etc; }

    public void setOrderId(int orderId) { this.orderId = orderId; }
    public void setProductId(int productId) { this.productId = productId; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
    public void setPlannedQuantity(int plannedQuantity) { this.plannedQuantity = plannedQuantity; }
    public void setMaterialId(int materialId) { this.materialId = materialId; }
    public void setMaterialName(String materialName) { this.materialName = materialName; }
    public void setRequiredMaterialQty(double requiredMaterialQty) { this.requiredMaterialQty = requiredMaterialQty; }
    public void setMaterialCost(double materialCost) { this.materialCost = materialCost; }
    public void setTotalMrpCost(double totalMrpCost) { this.totalMrpCost = totalMrpCost; }
    public void setEtc(String etc) { this.etc = etc; }
}
