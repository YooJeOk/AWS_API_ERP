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

    @GetMapping
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderService.getAllWorkOrders();
    }

    @GetMapping("/available")
    public List<WorkOrder> getAvailableWorkOrders() {
        return workOrderService.getAvailableWorkOrders();
    }

    @GetMapping("/{orderId}")
    public Optional<WorkOrder> getWorkOrderById(@PathVariable int orderId) {
        System.out.println("Fetching WorkOrder with orderId: " + orderId);
        return workOrderService.findWorkOrderDetailsById(orderId);
    }

    @PostMapping
    public WorkOrder createWorkOrder(@RequestBody WorkOrder workOrder) {
        return workOrderService.saveWorkOrder(workOrder);
    }

    @DeleteMapping("/{orderId}")
    public void deleteWorkOrder(@PathVariable int orderId) {
        workOrderService.deleteWorkOrderById(orderId);
    }

    // 검사가 완료되지 않은 주문 ID 목록 반환
    @GetMapping("/uninspected")
    public List<WorkOrder> getUninspectedOrders() {
        return workOrderService.findUninspectedOrders();
    }
}
