// WorkOrderService.java 전체 코드
package com.ERP.FinalProject.domain.production.planning.service;

import com.ERP.FinalProject.domain.production.planning.model.WorkOrder;
import com.ERP.FinalProject.domain.production.planning.repository.WorkOrderRepository;
import com.ERP.FinalProject.domain.production.planning.repository.ProductionPlanningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final ProductionPlanningRepository productionPlanningRepository;

    @Autowired
    public WorkOrderService(WorkOrderRepository workOrderRepository, ProductionPlanningRepository productionPlanningRepository) {
        this.workOrderRepository = workOrderRepository;
        this.productionPlanningRepository = productionPlanningRepository;
    }

    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.findAll();
    }

    public WorkOrder getWorkOrderById(int orderId) {
        return workOrderRepository.findById(orderId).orElse(null);
    }

    public List<WorkOrder> getAvailableWorkOrders() {
        List<Integer> usedOrderIds = productionPlanningRepository.findAllOrderIds();
        return workOrderRepository.findAll().stream()
                .filter(workOrder -> !usedOrderIds.contains(workOrder.getOrderId()))
                .collect(Collectors.toList());
    }

    public WorkOrder saveWorkOrder(WorkOrder workOrder) {
        return workOrderRepository.save(workOrder);
    }

    public void deleteWorkOrderById(int orderId) {
        workOrderRepository.deleteById(orderId);
    }
}
