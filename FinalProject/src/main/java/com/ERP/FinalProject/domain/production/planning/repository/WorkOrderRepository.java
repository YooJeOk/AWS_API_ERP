package com.ERP.FinalProject.domain.production.planning.repository;

import com.ERP.FinalProject.domain.production.planning.model.WorkOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Integer> {

	@Query("SELECT wo FROM WorkOrder wo WHERE wo.orderId NOT IN (SELECT qc.OrderID FROM QualityControl qc)")
	List<WorkOrder> findUninspectedOrders();

}
