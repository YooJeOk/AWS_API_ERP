package com.ERP.FinalProject.domain.production.planning.service;

import com.ERP.FinalProject.domain.production.planning.model.WorkOrder;
import com.ERP.FinalProject.domain.production.planning.repository.WorkOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;

    @Autowired
    public WorkOrderService(WorkOrderRepository workOrderRepository) {
        this.workOrderRepository = workOrderRepository;
    }

    // 모든 WorkOrders 데이터 조회
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.findAll();
    }

    // 특정 OrderID로 WorkOrder 조회
    public Optional<WorkOrder> getWorkOrderById(Integer orderId) {
        return workOrderRepository.findById(orderId);
    }

    // 새로운 WorkOrder 저장
    public WorkOrder saveWorkOrder(WorkOrder workOrder) {
        return workOrderRepository.save(workOrder);
    }

    // WorkOrder 삭제
    public void deleteWorkOrderById(Integer orderId) {
        workOrderRepository.deleteById(orderId);
    }
}
