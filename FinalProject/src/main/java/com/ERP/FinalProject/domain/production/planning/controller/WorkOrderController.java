package com.ERP.FinalProject.domain.production.planning.controller;

import com.ERP.FinalProject.domain.production.planning.model.WorkOrder;
import com.ERP.FinalProject.domain.production.planning.service.WorkOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workorders")
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    @Autowired
    public WorkOrderController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }

    // 모든 WorkOrder 데이터 조회
    @GetMapping
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderService.getAllWorkOrders();
    }

    // 특정 ID의 WorkOrder 조회
    @GetMapping("/{orderId}")
    public Optional<WorkOrder> getWorkOrderById(@PathVariable Integer orderId) {
        return workOrderService.getWorkOrderById(orderId);
    }

    // 새로운 WorkOrder 생성
    @PostMapping
    public WorkOrder createWorkOrder(@RequestBody WorkOrder workOrder) {
        return workOrderService.saveWorkOrder(workOrder);
    }

    // 특정 ID의 WorkOrder 삭제
    @DeleteMapping("/{orderId}")
    public void deleteWorkOrder(@PathVariable Integer orderId) {
        workOrderService.deleteWorkOrderById(orderId);
    }
}
