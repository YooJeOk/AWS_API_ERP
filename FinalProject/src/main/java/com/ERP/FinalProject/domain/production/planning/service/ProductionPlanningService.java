package com.ERP.FinalProject.domain.production.planning.service;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanningDTO;
import com.ERP.FinalProject.domain.production.planning.repository.ProductionPlanningRepository;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@Service
public class ProductionPlanningService {

	private final ProductionPlanningRepository productionPlanningRepository;
	private final DataSource dataSource;

	public ProductionPlanningService(ProductionPlanningRepository productionPlanningRepository, DataSource dataSource) {
		this.productionPlanningRepository = productionPlanningRepository;
		this.dataSource = dataSource;
	}

	public List<ProductionPlanningDTO> getBasicProductionPlanning() {
		return productionPlanningRepository.getBasicProductionPlanningData();
	}

	public boolean saveProductionPlanning(ProductionPlanning productionPlanning) {
		try (Connection connection = dataSource.getConnection()) {
			return productionPlanningRepository.save(productionPlanning, connection);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean saveAllProductionPlanning(List<ProductionPlanning> productionPlanningList) {
		try (Connection connection = dataSource.getConnection()) {
			for (ProductionPlanning planning : productionPlanningList) {
				if (!productionPlanningRepository.save(planning, connection)) {
					return false;
				}
			}
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

}
