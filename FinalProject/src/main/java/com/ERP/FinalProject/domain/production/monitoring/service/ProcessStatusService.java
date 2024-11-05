package com.ERP.FinalProject.domain.production.monitoring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ERP.FinalProject.domain.production.monitoring.model.ProductionProcessStatus;
import com.ERP.FinalProject.domain.production.monitoring.repository.ProcessStatusRepository;

import java.util.List;

@Service
public class ProcessStatusService {

    private final ProcessStatusRepository repository;

    @Autowired
    public ProcessStatusService(ProcessStatusRepository repository) {
        this.repository = repository;
    }

    public List<ProductionProcessStatus> getAllStatuses() {
        return repository.findAll();
    }
}
