package com.ERP.FinalProject.domain.production;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class ProductionMonitoringAlert {
    public static void main(String[] args) {
        // 적정 온도와 습도 범위
        float minTemp = 24.0f;
        float maxTemp = 30.0f;
        int minHumidity = 60;
        int maxHumidity = 70;

        try {
            // DB 연결 설정
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/ERP", "username", "password");
            Statement statement = connection.createStatement();

            // 현재 작업 중인 데이터 가져오기
            String query = "SELECT OrderID, Temperature, Humidity FROM ProductionMonitoring";
            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                int orderId = resultSet.getInt("OrderID");
                float temperature = resultSet.getFloat("Temperature");
                int humidity = resultSet.getInt("Humidity");

                // 온도와 습도가 적정 범위를 벗어났는지 체크
                if (temperature < minTemp || temperature > maxTemp) {
                    System.out.println("경고: OrderID " + orderId + " 작업의 온도가 적정 범위를 벗어났습니다! (" + temperature + "°C)");
                }
                if (humidity < minHumidity || humidity > maxHumidity) {
                    System.out.println("경고: OrderID " + orderId + " 작업의 습도가 적정 범위를 벗어났습니다! (" + humidity + "%)");
                }
            }

            // DB 리소스 닫기
            resultSet.close();
            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}











//기능 설명
//이 Java 코드는 ProductionMonitoring 테이블에서 Temperature와 Humidity 값을 가져와 적정 범위를 벗어나면 경고 메시지를 출력합니다.
//적정 온도 범위는 24°C ~ 30°C, 적정 습도 범위는 **60% ~ 70%**로 설정했습니다.
//적정 범위를 벗어나면 알림 메시지가 콘솔에 출력됩니다.
//
//이 코드를 확장하여 이메일, 푸시 알림, 대시보드 경고 등을 추가할 수 있습니다.