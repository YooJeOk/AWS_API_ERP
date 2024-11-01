// WorkOrderRepository.java 전체 코드
package com.ERP.FinalProject.domain.production.planning.repository;

import com.ERP.FinalProject.domain.production.planning.model.WorkOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Integer> {
}
