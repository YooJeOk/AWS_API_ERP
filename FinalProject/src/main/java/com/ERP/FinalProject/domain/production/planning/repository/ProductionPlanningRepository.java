package com.ERP.FinalProject.domain.production.planning.repository;

import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanning;
import com.ERP.FinalProject.domain.production.planning.model.ProductionPlanningDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class ProductionPlanningRepository {

    private final JdbcTemplate jdbcTemplate;

    public ProductionPlanningRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 기본 Production Planning DTO를 가져오는 메서드
    public List<ProductionPlanningDTO> getBasicProductionPlanningData() {
        String sql = "SELECT " +
                     "pp.PlanID AS planId, " +
                     "pp.OrderID AS orderId, " +
                     "pp.ProductID AS productId, " +
                     "pp.StartDate AS startDate, " +
                     "pp.EndDate AS endDate, " +
                     "pp.etc  AS etc," +
                     "wo.Quantity AS orderQuantity, " +
                     "p.ProductName AS productName " +
                     "FROM ERP.ProductionPlanning pp " +
                     "JOIN ERP.WorkOrders wo ON pp.OrderID = wo.OrderID " +
                     "JOIN ERP.Product p ON pp.ProductID = p.ProductID " +
                     "ORDER BY pp.PlanID;";

        return jdbcTemplate.query(sql, new ProductionPlanningRowMapper());
    }

    // RowMapper 내부 클래스 정의
    private static class ProductionPlanningRowMapper implements RowMapper<ProductionPlanningDTO> {
        @Override
        public ProductionPlanningDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
            ProductionPlanningDTO dto = new ProductionPlanningDTO();
            dto.setPlanId(rs.getInt("planId"));
            dto.setOrderId(rs.getInt("orderId"));
            dto.setProductId(rs.getInt("productId"));
            dto.setStartDate(rs.getTimestamp("startDate").toLocalDateTime());
            dto.setEndDate(rs.getTimestamp("endDate").toLocalDateTime());
            dto.setOrderQuantity(rs.getInt("orderQuantity"));
            dto.setProductName(rs.getString("productName"));
            dto.setEtc(rs.getString("etc"));
            return dto;
        }
    }

    public boolean save(ProductionPlanning productionPlanning, Connection connection) {
        String sql = "INSERT INTO ERP.ProductionPlanning (OrderID, ProductID, StartDate, EndDate, etc) VALUES (?, ?, ?, ?, ?)";

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, productionPlanning.getOrderId()); // OrderID 설정
            stmt.setInt(2, productionPlanning.getProductId()); // ProductID 설정
            
            // LocalDateTime을 Timestamp로 변환하여 setTimestamp로 저장
            stmt.setTimestamp(3, Timestamp.valueOf(productionPlanning.getStartDate())); // StartDate 설정
            stmt.setTimestamp(4, Timestamp.valueOf(productionPlanning.getEndDate())); // EndDate 설정
            
            stmt.setString(5, productionPlanning.getEtc()); // 기타 사항 설정

            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0; // 성공적으로 저장된 경우 true 반환
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


}