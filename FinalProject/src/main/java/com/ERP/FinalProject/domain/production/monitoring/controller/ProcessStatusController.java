package com.ERP.FinalProject.domain.production.monitoring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ERP.FinalProject.domain.production.monitoring.model.ProductionProcessStatus;
import com.ERP.FinalProject.domain.production.monitoring.service.ProcessStatusService;

import java.util.List;

@RestController
@RequestMapping("/api/production-process-status")
public class ProcessStatusController {

    private final ProcessStatusService service;

    @Autowired
    public ProcessStatusController(ProcessStatusService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<ProductionProcessStatus> getAllStatuses() {
        return service.getAllStatuses();
    }
}
