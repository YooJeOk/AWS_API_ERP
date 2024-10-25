

package com.ERP.FinalProject.domain.production;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductionMonitoringAlertService {

    // 적정 온도와 습도 범위
    private final float minTemp = 24.0f;
    private final float maxTemp = 30.0f;
    private final int minHumidity = 60;
    private final int maxHumidity = 70;

    @Autowired
    private ProductionMonitoringRepository productionMonitoringRepository;

    // 경고 로직
    public String checkForAlerts() {
        List<ProductionMonitoring> monitoringData = productionMonitoringRepository.findAll();
        StringBuilder alertMessages = new StringBuilder();

        for (ProductionMonitoring data : monitoringData) {
            boolean alertGenerated = false;
            
            if (data.getTemperature() < minTemp || data.getTemperature() > maxTemp) {
                alertMessages.append("경고: OrderID ")
                    .append(data.getOrderId())
                    .append(" 작업의 온도가 적정 범위를 벗어났습니다! (")
                    .append(data.getTemperature())
                    .append("°C)\n");
                alertGenerated = true;
            }

            if (data.getHumidity() < minHumidity || data.getHumidity() > maxHumidity) {
                alertMessages.append("경고: OrderID ")
                    .append(data.getOrderId())
                    .append(" 작업의 습도가 적정 범위를 벗어났습니다! (")
                    .append(data.getHumidity())
                    .append("%)\n");
                alertGenerated = true;
            }

            if (!alertGenerated) {
                alertMessages.append("OrderID ").append(data.getOrderId())
                    .append(" 작업은 정상 범위 내에 있습니다.\n");
            }
        }

        // 경고 메시지를 리턴
        return alertMessages.toString();
    }
}

